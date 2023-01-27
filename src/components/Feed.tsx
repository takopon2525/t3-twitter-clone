import React from "react";
import { Ring } from "@uiball/loaders";
import { TweetPost } from "./TweetPost";
import { api } from "../utils/api";
import Tweet from "./Tweet";

const Timeline_Limit = 10;

function Feed() {
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    api.tweet.timeline.useInfiniteQuery(
      { limit: Timeline_Limit },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  // Nestになったオブジェクトのため
  console.log(hasNextPage, fetchNextPage, isFetching, isLoading);
  const tweets = data?.pages.flatMap((page) => page.tweets);
  // dataは取得できている。ここから、取得した値を元に色々とカスタム
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">ホーム</h1>
      </div>
      {/* tweet post */}
      <div>
        <div>
          <TweetPost />
        </div>
        {/* ここにtimelineの要素を追加 */}
        <div>
          {tweets?.map((tweet) => (
            <Tweet tweet={tweet} key={tweet.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
