import React from "react";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="mx-auto max-h-screen lg:max-w-6xl">
      <main className="grid grid-cols-9">
        <div className="sticky top-0 left-0 col-span-2 flex h-screen flex-col items-center justify-between overflow-auto lg:items-start">
          Sidebar
        </div>
        {children}
        <div className="col-span-2 mt-2 hidden w-full items-start px-2 lg:inline">
          Widget
        </div>
      </main>
    </div>
  );
}
