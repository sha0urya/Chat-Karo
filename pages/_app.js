import "@/styles/globals.css";

import { UserProvider } from "@/context/authContext";
import { ChatContextProvider } from "@/context/chatContext";
import { ThemeProvider } from "@/context/themeContext";
export default function App({ Component, pageProps }) {
    return (
      <UserProvider>
        <ChatContextProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </ChatContextProvider>
      </UserProvider>
    );
}
