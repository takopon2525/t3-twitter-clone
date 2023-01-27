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

export function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}) {
  return <div>Tweet</div>;
}

export default Tweet;
