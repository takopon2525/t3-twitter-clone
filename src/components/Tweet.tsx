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
      <div className="mt-5 flex justify-between">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
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
            <AiOutlineHeart className="h-5 w-5" />
          </div>
          <p>0</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <div className="p-3 hover:rounded-full hover:bg-slate-200">
            <AiOutlineUpload className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
