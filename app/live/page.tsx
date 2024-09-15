"use client";

import LiveVideoFrame from "@/components/ui/LiveVideoFrame";
import {useState} from 'react';

export default function LivePage() {
  const [processingType, setProcessingType] = useState("elbow");

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Video Stream:</h1>
      <LiveVideoFrame
        streaming={true}
        width={1280}
        height={720}
        processingType={processingType}
      />

      <select className="mt-4 shadow-sm" value={processingType} onChange={(e) => setProcessingType(e.target.value)}>
        <option value="shoulder">Shoulder</option>
        <option value="elbow">Elbow</option>
        <option value="hip">Hip</option>
      </select>
    </>
  );
}
