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
import { RouterOutputs } from "../utils/api";
import Image from "next/image";

export function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}) {
  const formatter = buildFormatter(japanStrings);
  return (
    <div className="flex cursor-pointer flex-col space-x-3 border-y border-gray-100 p-5 hover:bg-slate-100">
      {/* ここにLinkボタンを配置予定 */}
      <div>
        {tweet.author.image && (
          <Image
            src={tweet.author.image}
            alt={`${tweet.author.name} profile picture`}
            width={48}
            height={48}
            className="rounded-full"
          />
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
    </div>
  );
}

export default Tweet;
