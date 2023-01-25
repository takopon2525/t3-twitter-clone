import React from "react";
import { Ring } from "@uiball/loaders";
import TweetPost from "./TweetPost";
import { api } from "../utils/api";

const Timeline_Limit = 10;

function Feed() {
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    api.tweet.timeline.useInfiniteQuery(
      { limit: Timeline_Limit },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  console.log(data?.pages);
  // dataは取得できている。ここから、取得した値を元に色々とカスタム
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">ホーム</h1>
      </div>
      {/* tweet post */}
      <div>
        <TweetPost />
        {/* ここにtimelineの要素を追加 */}
      </div>
    </div>
  );
}

export default Feed;
