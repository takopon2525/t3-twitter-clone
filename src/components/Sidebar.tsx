import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { RiQuillPenLine } from "react-icons/ri";
import { IoListCircleOutline } from "react-icons/io5";
import SidebarIcons from "./SidebarIcons";
import { signIn, signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 left-0 col-span-2 flex h-screen flex-col items-center justify-between overflow-auto lg:items-start">
      <div className="px-4 lg:w-full">
        <img
          src="/twitterLogo.svg"
          alt="twitter logo"
          className="m-3 h-10 w-10"
        />
        <SidebarIcons Icon={AiOutlineHome} title="ホーム" />
        <SidebarIcons Icon={AiOutlineBell} title="通知" />
        <SidebarIcons Icon={AiOutlineMail} title="メッセージ" />
        <SidebarIcons Icon={IoListCircleOutline} title="リスト" />
        <SidebarIcons
          Icon={AiOutlineUser}
          title={session ? "サインアウト" : "サインイン"}
          onClick={session ? signOut : signIn}
        />
        <SidebarIcons Icon={HiOutlineDotsCircleHorizontal} title="もっと見る" />
        {session && (
          <button className="max-fit group relative mt-4 rounded-full bg-sky-400 p-4 text-sm font-bold text-white lg:w-full lg:text-base">
            <RiQuillPenLine className="h-6 w-6 lg:hidden" />
            <span className="invisible absolute top-11 -left-3 w-[74px] rounded bg-slate-400 py-1 text-center text-[12px] font-bold text-white opacity-100 group-hover:visible lg:hidden">
              ツイートする
            </span>
            <span className="hidden lg:inline">ツイートする</span>
          </button>
        )}
      </div>
      {session && (
        <div className="mt-20 flex items-center px-4 pb-5 lg:w-full">
          <img
            src={session?.user?.image ?? ""}
            className="mt-2 h-14 w-14 rounded-full object-cover"
          />
          <span className="hidden overflow-hidden text-ellipsis whitespace-nowrap pl-3 font-bold lg:inline">
            {session?.user?.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
