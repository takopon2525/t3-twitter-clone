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
import Image from "next/image";
import { object, string } from "zod";

export const tweetSchema = object({
  text: string({ required_error: "ツイートを入力してください。" })
    .min(10)
    .max(140),
});

export function TweetPost() {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const utils = api.useContext();

  const { mutateAsync } = api.tweet.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.tweet.timeline.invalidate();
    },
    onError: (e: any) => {
      console.log("onError", e);
      // setError(e)
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      tweetSchema.parse({ text });
    } catch (e: any) {
      console.log(e);
      setError(e);
      return;
    }
    mutateAsync({ text });
  }
  return (
    <>
      <div className="flex space-x-2 p-5">
        <div style={{ width: 48, height: 48, position: "relative" }}>
          <Image
            src={
              session?.user?.image ||
              "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            }
            alt=""
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex flex-1">
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
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
              <div className="flex flex-1 space-x-2">
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
          </form>
        </div>
      </div>
    </>
  );
}
