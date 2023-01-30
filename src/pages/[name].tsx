import { useRouter } from "next/router";
import React from "react";
import Feed from "../components/Feed";
import Head from "next/head";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  const id = router.query.id as string;

  return (
    <div className="scrollbar-hide col-span-7 min-h-screen overflow-scroll border-x lg:col-span-5">
      <Head>
        <title>{router.query.id}</title>
      </Head>
      <Feed where={{ author: { name } }} />
    </div>
  );
}
