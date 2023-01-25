import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import { api } from "../utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="mx-auto max-h-screen lg:max-w-6xl">
        <Toaster />
        <main className="grid grid-cols-9">
          <Sidebar />
          <Component {...pageProps} />
          <Widget />
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
