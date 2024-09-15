"use client";

import LiveVideoFrame from "@/components/ui/LiveVideoFrame";
import {useState} from 'react';

export default function LivePage() {
  const [processingType, setProcessingType] = useState("elbow");

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Video Stream:</h1>
      <LiveVideoFrame
        streaming={true}
        width={1280}
        height={720}
        processingType={processingType}
        includeButton={true}
      />

      <select
        className="mt-4 shadow-md hover:bg-slate-50"
        value={processingType}
        onChange={(e) => setProcessingType(e.target.value)}
      >
        <option value="shoulder">Shoulder</option>
        <option value="elbow">Elbow</option>
        <option value="knee">Knee</option>
      </select>
    </div>
  );
}
