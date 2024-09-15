"use client";

import LiveVideoFrame from "@/components/ui/LiveVideoFrame";

export default function LivePage() {
  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Video Stream:</h1>
      <LiveVideoFrame
        streaming={true}
        width={1280}
        height={720}
        processingType="shoulder"
      />
    </>
  );
}
