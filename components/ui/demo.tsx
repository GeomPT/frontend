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
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left side: information and button */}
          <div className="md:w-1/2 p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Live Demo</h3>
            <p className="text-gray-600 mb-4">
              See our AI-powered joint tracking in action. Start your camera to
              begin.
            </p>
            <button
              className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={onClick}
            >
              <Play size={20} className="mr-2" /> {buttonValue}
            </button>
          </div>

          {/* Right side: Video Stream */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              {streaming ? (
                <LiveVideoFrame
                  streaming={streaming}
                  width={256}
                  height={256}
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
