import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonFriend() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </>
  );
}
