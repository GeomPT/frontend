'use client';

import LiveVideoFrame from "@/components/ui/LiveVideoFrame";

export default function LivePage() {
    return (
      <>
        Video Stream:
        <LiveVideoFrame streaming={true} width={1028} height={1028} />
      </>
    );
}