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
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();
  const utils = api.useContext();

  const {} = api.tweet.create.useMutation({
    onSuccess: () => {
      setInput("");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
    } catch (e) {}
  }
  return (
    <div>
      <img
        src={
          session?.user?.image ||
          "https://images.unsplash.com/photo-1525389999255-82bad487f23c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHVua25vd258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        }
        alt=""
        className="mt-4 h-14 w-14 rounded-full"
      ></img>
      <div>
        <form>
          <textarea
            value={input}
            disabled={!session}
            onChange={(e) => setInput(e.target.value)}
            className="h-full w-full text-xl outline-none placeholder:text-xl"
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
            <button></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetPost;
