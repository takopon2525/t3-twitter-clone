import React from "react";
import { Ring } from "@uiball/loaders";
import TweetPost from "./TweetPost";

function Feed() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">ホーム</h1>
      </div>
      {/* tweet post */}
      <div>
        <TweetPost/>
      </div>
    </div>
  );
}

export default Feed;