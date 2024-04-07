import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Skeletoncard() {
  return (
    <>
      <div className="flex flex-col space-y-3 p-6">
        <div className="flex items-center gap-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <Skeleton className="h-80 w-100 rounded-xl" />
      </div>
    </>
  );
}
