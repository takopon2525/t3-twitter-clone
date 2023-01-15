import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function Widget() {
  return (
    <div className="col-span-2 mt-2 hidden w-full items-start px-2 lg:inline">
      {/* Search */}
      <div className="mb-5 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <AiOutlineSearch className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <input
          className="bg-transparent outline-none"
          type="text"
          placeholder="Search Twitter"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="taka_ton19z"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widget;
