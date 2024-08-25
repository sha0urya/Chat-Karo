import React from "react";
import { useTheme } from "@/context/themeContext";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatFooter from "./ChatFooter";
import { useChatContext } from "@/context/chatContext";
import { useAuth } from "@/context/authContext";

const Chat = () => {
  const { data, users } = useChatContext();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
    (u) => u === data.user.uid
  );

  const IamBlocked = users[data.user.uid]?.blockedUsers?.find(
    (u) => u === currentUser.uid
  );

  return (
    <div
      className={`flex flex-col p-5 grow ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-slate-300 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <ChatHeader />
      </div>
      {data.chatId && <Messages />}
      {!isUserBlocked && !IamBlocked && <ChatFooter />}

      {isUserBlocked && (
        <div className="w-full text-center text-c3 py-5">
          This user has been blocked
        </div>
      )}

      {IamBlocked && (
        <div className="w-full text-center text-c3 py-5">
          {`${data.user.displayName} has blocked you!`}
        </div>
      )}
    </div>
  );
};

export default Chat;
