import {
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineUpload,
} from "react-icons/ai";
import TimeAgo from "react-timeago";
import japanStrings from "react-timeago/lib/language-strings/ja";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Ring } from "@uiball/loaders";
import { api, RouterInputs, RouterOutputs } from "../utils/api";
import Image from "next/image";
import { InfiniteData, QueryClient } from "@tanstack/react-query";

function updateCache({
  client,
  variables,
  data,
  action,
  input,
}: {
  client: QueryClient;
  input: RouterInputs["tweet"]["timeline"];
  variables: { tweetId: string };
  data: { userId: string };
  action: "like" | "unlike";
}) {
  client.setQueryData(
    [
      ["tweet", "timeline"],
      {
        input,
        type: "infinite",
      },
    ],
    (oldData) => {
      const newData = oldData as InfiniteData<
        RouterOutputs["tweet"]["timeline"]
      >;
      const value = action === "like" ? 1 : -1;
      const newTweets = newData.pages.map((page) => {
        return {
          tweets: page.tweets.map((tweet: any) => {
            if (tweet.id === variables.tweetId) {
              return {
                ...tweet,
                likes: action === "like" ? [data.userId] : [],
                _count: {
                  likes: tweet._count.likes + value,
                },
              };
            }
            return tweet;
          }),
        };
      });
      return {
        ...newData,
        pages: newTweets,
      };
    }
  );
}

export function Tweet({
  tweet,
  client,
  input,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
  client: QueryClient;
  input: RouterInputs["tweet"]["timeline"];
}) {
  const formatter = buildFormatter(japanStrings);
  const { data: session } = useSession();
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [inputCommentText, setInputCommentText] = useState("");
  const likeMutation = api.tweet.like.useMutation({
    onSuccess: (data, variables) => {
      updateCache({ client, data, variables, input, action: "like" });
    },
  }).mutateAsync;
  const unlikeMutation = api.tweet.unlike.useMutation({
    onSuccess: (data, variables) => {
      updateCache({ client, data, variables, input, action: "unlike" });
    },
  }).mutateAsync;
  const hasLiked = tweet.likes.length > 0;
  return (
    <div className="flex cursor-pointer flex-col space-x-3 border-y border-gray-100 p-5 hover:bg-slate-100">
      {/* ここにLinkボタンを配置予定 */}
      <Link href={`/${tweet.author.name}`}>
        <div className="flex space-x-3">
          {tweet.author.image && (
            <div style={{ width: 48, height: 48, position: "relative" }}>
              <Image
                src={tweet.author.image}
                alt={`${tweet.author.name} profile picture`}
                fill
                className="rounded-full"
              />
            </div>
          )}
          <div>
            <div className="flex items-center space-x-3">
              <p className="font-bold">{tweet.author.name}</p>
              <TimeAgo
                className="text-sm text-gray-500"
                date={tweet.createdAt}
                formatter={formatter}
              />
            </div>
            <p>{tweet.text}</p>
          </div>
        </div>
      </Link>

      <div className="mt-5 flex justify-between">
        <div
          onClick={(e) => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <div className="p-3 hover:rounded-full hover:bg-slate-200">
            <AiOutlineMessage className="h-5 w-5" />
          </div>
          <p>0</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <div className="p-3 hover:rounded-full hover:bg-slate-200">
            <AiOutlineRetweet className="h-5 w-5" />
          </div>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <div className="p-3 hover:rounded-full hover:bg-slate-200">
            <AiOutlineHeart
              className="h-5 w-5"
              color={hasLiked ? "red" : "gray"}
              onClick={() => {
                if (hasLiked) {
                  if (hasLiked) {
                    unlikeMutation({
                      tweetId: tweet.id,
                    });
                    return;
                  }
                }
                likeMutation({
                  tweetId: tweet.id,
                });
              }}
            />
          </div>
          <span className="text-sm text-gray-500">{tweet._count.likes}</span>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <div className="p-3 hover:rounded-full hover:bg-slate-200">
            <AiOutlineUpload className="h-5 w-5" />
          </div>
        </div>
      </div>
      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3">
          <input
            value={inputCommentText}
            onChange={(e) => setInputCommentText(e.target.value)}
            className="flex-1 rounded-md bg-gray-100 p-2 outline-none"
            placeholder="返信をツイート"
          />
          <button
            disabled={!inputCommentText}
            type="submit"
            className="rounded-full bg-sky-400 px-5 py-2 font-bold text-white hover:bg-sky-600 disabled:opacity-40"
          >
            返信
          </button>
        </form>
      )}
    </div>
  );
}

export default Tweet;
