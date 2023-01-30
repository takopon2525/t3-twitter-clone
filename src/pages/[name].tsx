import { useRouter } from "next/router";
import React from "react";
import Feed from "../components/Feed";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  return (
    <div>
      <Feed where={{ author: { name } }} />
    </div>
  );
}
