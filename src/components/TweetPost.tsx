import {
  HiOutlineCalendar,
  HiOutlineEmojiHappy,
  HiOutlineLocationMarker,
  HiOutlinePhotograph,
  HiOutlineSearchCircle,
} from "react-icons/hi";
import { useSession } from "next-auth/react";

function TweetPost() {
  const { data: session } = useSession();
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
    </div>
  );
}

export default TweetPost;
