import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import Avatar from "./Avatar";
import { useChatContext } from "@/context/chatContext";
import Image from "next/image";
import ImageViewer from "react-simple-image-viewer";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { formateDate, wrapEmojisInHtmlTag } from "@/utils/helpers";
import Icon from "./Icon";
import MessageMenu from "./MessageMenu";
import DeleteMsgPopup from "../popup/DeleteMsgPopup";
import { db } from "@/firebase/firebase";
import { DELETED_FOR_EVERYONE, DELETED_FOR_ME } from "@/utils/constants";
import ClickAwayListener from "react-click-away-listener";

const Message = ({ message }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { currentUser } = useAuth();
  const { users, data, imageViewer, setImageViewer, setEditMsg } =
    useChatContext();
  const self = message.sender === currentUser.uid;

  const timestamp = new Timestamp(
    message.date?.seconds,
    message.date?.nanoseconds
  );
  const date = timestamp.toDate();

  const deletePopupHandler = () => {
    setShowDeletePopup(true);
    setShowMenu(false);
  };

  const deleteMessage = async (action) => {
    try {
      const messageId = message.id;
      const chatRef = doc(db, "chats", data.chatId);
      const chatDoc = await getDoc(chatRef);

      const updatedMessages = chatDoc.data().messages.map((msg) => {
        if (msg.id === messageId) {
          if (action === DELETED_FOR_ME) {
            msg.deletedInfo = {
              [currentUser.uid]: DELETED_FOR_ME,
            };
          }
          if (action === DELETED_FOR_EVERYONE) {
            msg.deletedInfo = {
              deletedForEveryone: true,
            };
          }
        }
        return msg;
      });

      await updateDoc(chatRef, { messages: updatedMessages });
      setShowDeletePopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLikeMessage = async () => {
    try {
      const messageId = message.id;
      const chatRef = doc(db, "chats", data.chatId);
      const chatDoc = await getDoc(chatRef);

      const updatedMessages = chatDoc.data().messages.map((msg) => {
        if (msg.id === messageId) {
          msg.likedBy = msg.likedBy || [];
          if (msg.likedBy.includes(currentUser.uid)) {
            msg.likedBy = msg.likedBy.filter((uid) => uid !== currentUser.uid);
          } else {
            msg.likedBy.push(currentUser.uid);
          }
        }
        return msg;
      });

      await updateDoc(chatRef, { messages: updatedMessages });
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Message copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy message: ", err);
      }
    );
  };

  const handleClickAway = () => {
    setShowMenu(false);
  };

  return (
    <div className={`mb-5 max-w-[75%] ${self ? "self-end" : ""}`}>
      {showDeletePopup && (
        <DeleteMsgPopup
          onHide={() => setShowDeletePopup(false)}
          className="DeleteMsgPopup"
          noHeader={true}
          shortHeight={true}
          self={self}
          deleteMessage={deleteMessage}
        />
      )}
      <ClickAwayListener onClickAway={handleClickAway}>
        <div
          className={`flex items-end gap-3 mb-1 ${
            self ? "justify-start flex-row-reverse" : ""
          }`}
        >
          <Avatar
            size="small"
            user={self ? currentUser : users[data.user.uid]}
            className="mb-4"
          />
          <div
            className={`group flex flex-col gap-4 p-4 rounded-3xl relative break-all text-white cursor-pointer ${
              self ? "rounded-br-md bg-c5" : "rounded-bl-md bg-c1"
            }`}
            onClick={() => setShowMenu(!showMenu)}
          >
            {message.text && (
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: wrapEmojisInHtmlTag(message.text),
                }}
              ></div>
            )}

            {message.img && (
              <>
                <Image
                  src={message.img}
                  width={250}
                  height={250}
                  alt={message?.text || ""}
                  className="rounded-3xl max-w-[250px]"
                  onClick={() => {
                    setImageViewer({
                      msgId: message.id,
                      url: message.img,
                    });
                  }}
                />
                {imageViewer && imageViewer.msgId === message.id && (
                  <ImageViewer
                    src={[imageViewer.url]}
                    currentIndex={0}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={() => setImageViewer(null)}
                  />
                )}
              </>
            )}

            {/* Message Menu */}
            {showMenu && (
              <div
                className={`absolute top-2 ${
                  self ? "left-2" : "right-2"
                } bg-c1 rounded-lg shadow-lg`}
              >
                <MessageMenu
                  self={self}
                  setShowMenu={setShowMenu}
                  showMenu={showMenu}
                  deletePopupHandler={deletePopupHandler}
                  setEditMsg={() => setEditMsg(message)}
                  toggleLikeMsg={toggleLikeMessage}
                  likedByCurrentUser={message.likedBy?.includes(
                    currentUser.uid
                  )}
                  copyMessage={() => copyToClipboard(message.text)}
                />
              </div>
            )}

            {message.likedBy && message.likedBy.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="text-xs text-c3">Liked by:</div>
                {message.likedBy.map((uid) => (
                  <Avatar
                    key={uid}
                    size="extra-small"
                    user={users[uid]}
                    className="text-xs text-c3"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ClickAwayListener>
      <div
        className={`flex items-end ${
          self ? "justify-start flex-row-reverse mr-12" : "ml-12"
        }`}
      >
        <div className="text-xs text-c3">{formateDate(date)}</div>
      </div>
    </div>
  );
};

export default Message;
