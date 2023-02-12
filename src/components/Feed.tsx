import React from "react";
import { Ring } from "@uiball/loaders";
import { TweetPost } from "./TweetPost";
import { api, RouterInputs } from "../utils/api";
import Tweet from "./Tweet";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Timeline_Limit = 10;

function Feed({
  where = {},
}: {
  where?: RouterInputs["tweet"]["timeline"]["where"];
}) {
  // scrollポジションを取ってくるコードをhookにした。
  const scrollPosition = useScrollPosition();
  // tanstackQueryに詳細は記載されている。
  // data.pagesで返ってくる。hasnextPageは次のぺージの値。isFetchingはfetch中。isLoadingはisFetchingがあれば不要かも
  // fetchNextPage()はコールバック関数。これを呼び出すことで、次のぺージ結果呼ばれる。
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    api.tweet.timeline.useInfiniteQuery(
      { limit: Timeline_Limit, where },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  console.log(data);
  // Nestになったオブジェクトのため
  // console.log(hasNextPage, fetchNextPage, isFetching, isLoading);
  const tweets = data?.pages.flatMap((page) => page.tweets);
  // dataは取得できている。ここから、取得した値を元に色々とカスタム
  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  const client = useQueryClient();
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
            <Tweet
              tweet={tweet}
              key={tweet.id}
              client={client}
              input={{ where, limit: Timeline_Limit }}
            />
          ))}
          {!hasNextPage && <p>最後のツイートです。</p>}
        </div>
      </div>
    </div>
  );
}

export default Feed;
