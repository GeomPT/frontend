import { useState } from "react";
import { Play, User } from "lucide-react";
import LiveVideoFrame from "./LiveVideoFrame";

export default function Demo() {
  const [streaming, setStreaming] = useState(false);
  const [buttonValue, setButtonValue] = useState("Start Demo");

  const onClick = () => {
    setStreaming((prev) => !prev);
    setButtonValue((prev) =>
      prev === "Start Demo" ? "Stop Demo" : "Start Demo"
    );
  };

  return (
    <>
     <div className="absolute inset-0 pointer-events-none"></div>
     <div className="rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left side: information and button */}
          <div className="md:w-1/2 p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Live Demo</h3>
            <p className="mb-4" style={{ color: '#000' }}>
  See our <span style={{ color: '#1E40AF', fontWeight: 'bold' }}>AI-powered</span> joint tracking in action. Start your camera to begin.
</p>
            <button
        className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
        onClick={onClick}
      >
        <Play size={20} className="mr-2" /> {buttonValue}
      </button>
          </div>

          {/* Right side: Video Stream */}
          <div className="md:w-1/2  flex items-center justify-center p-8">
            <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              {streaming ? (
                <LiveVideoFrame
                  streaming={streaming}
                  width={256}
                  height={256}
                  processingType="elbow"
                />
              ) : (
                <User size={64} className="text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
