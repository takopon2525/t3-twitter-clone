import {
  HiOutlineCalendar,
  HiOutlineEmojiHappy,
  HiOutlineLocationMarker,
  HiOutlinePhotograph,
  HiOutlineSearchCircle,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../utils/api";

function TweetPost() {
  const [text, setText] = useState<string>("");
  const { data: session } = useSession();
  const utils = api.useContext();

  const { mutateAsync } = api.tweet.create.useMutation({
    onSuccess: () => {
      setText("");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutateAsync({ text });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="mx-2 flex">
        <img
          src={
            session?.user?.image ||
            "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          }
          alt=""
          className="h-14 w-14 rounded-full"
        ></img>
        <div className="ml-2 flex-1">
          <textarea
            value={text}
            disabled={!session}
            onChange={(e) => setText(e.target.value)}
            className="h-full w-full rounded-xl pl-2 pt-2 text-xl outline-none placeholder:text-xl"
            placeholder={
              session ? "いまどうしてる？" : "サインインしてください。"
            }
          />
          <div className="flex">
            <div className="text-twitter flex flex-1 space-x-2">
              <HiOutlinePhotograph className="h-5 w-5" />
              <HiOutlineSearchCircle className="h-5 w-5" />
              <HiOutlineEmojiHappy className="h-5 w-5" />
              <HiOutlineCalendar className="h-5 w-5" />
              <HiOutlineLocationMarker className="h-5 w-5" />
            </div>
            <button
              disabled={!text || !session}
              type="submit"
              className="rounded-full bg-sky-400 px-5 py-2 font-bold text-white hover:bg-sky-600 disabled:opacity-40"
            >
              ツイートする
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default TweetPost;
