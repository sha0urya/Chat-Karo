import { useChatContext } from "@/context/chatContext";
import React, { useState } from "react";
import { useTheme } from "@/context/themeContext";
import Avatar from "./Avatar";
import Icon from "./Icon";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import ChatMenu from "./ChatMenu";
import SearchInMsg from "./SearchInMsg"
import { FaMoon, FaSun } from "react-icons/fa";

const ChatHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { users, data } = useChatContext();

  const online = users[data.user.uid]?.isOnline;
  const user = users[data.user.uid];

  const { theme, toggleTheme } = useTheme();


  return (
    <div className="flex justify-between items-center pt-3 hover:shadow-2xl dark:hover:shadow-slate-400 pb-3 w-full border rounded-xl border-slate-950 dark:border-neutral-100 ">
      {user ? (
        <div className="pl-2 flex items-center gap-3">
          <Avatar size="large" user={user} />
          <div>
            <div
              className="font-semibold font-serif"
              style={{ textTransform: "capitalize" }}
            >
              {user?.displayName}
            </div>
            <p className="text-sm text-c3">{online ? "Online" : "Offline"}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div>
            <div className="font-medium bg-gray-300 text-transparent">
              Placeholder Name
            </div>
            <p className="text-sm text-c3">Offline</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <SearchInMsg />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
        </button>
        <Icon
          size="large"
          className={`${
            showMenu ? "bg-gray-100 hover:bg-gray-100" : ""
          }hover:bg-gray-100 dark:hover:bg-gray-800`}
          onClick={() => setShowMenu(true)}
          icon={<IoEllipsisVerticalSharp size={20} className="text-c3" />}
        />
        {showMenu && <ChatMenu setShowMenu={setShowMenu} showMenu={showMenu} />}
      </div>
    </div>
  );
};

export default ChatHeader;
