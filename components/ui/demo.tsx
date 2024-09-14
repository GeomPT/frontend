import { useEffect, useRef, useState } from "react";
import { Play, User } from "lucide-react";
import io, { Socket } from "socket.io-client";
import { on } from "events";

export default function Demo() {
  const [streaming, setStreaming] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const videoRef = useRef<HTMLImageElement>(null);
  const latestFrame = useRef<string | null>(null);
  const [buttonValue, setButtonValue] = useState("Start Demo");

  const onClick = () => {
    if (streaming) {
      setButtonValue("Start Demo");
      setStreaming(false);
    } else {
      setButtonValue("Stop Demo");
      setStreaming(true);
    }
  };

  useEffect(() => {
    if (!streaming) return; // Only initialize the stream when streaming is true

    // Initialize WebSocket connection with WebSocket-only transport
    const newSocket = io("http://127.0.0.1:5000", {
      transports: ["websocket"], // Force WebSocket connection
    });

    setSocket(newSocket);

    // Emit event to request video stream
    newSocket.emit("video_stream");

    // Handle video frame event
    newSocket.on("video_frame", (frameData: ArrayBuffer) => {
      const blob = new Blob([frameData], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);

      latestFrame.current = url; // Store the latest frame URL
    });

    const renderFrame = () => {
      if (latestFrame.current && videoRef.current) {
        const oldUrl = videoRef.current.src;
        videoRef.current.src = latestFrame.current;
        latestFrame.current = null;

        if (oldUrl) {
          URL.revokeObjectURL(oldUrl); // Cleanup old URLs
        }
      }
      requestAnimationFrame(renderFrame); // Efficient frame rendering
    };

    requestAnimationFrame(renderFrame); // Start the animation frame loop

    return () => {
      if (newSocket) {
        newSocket.disconnect(); // Clean up WebSocket connection
      }
    };
  }, [streaming]); // Effect runs when 'streaming' state changes

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
              onClick={onClick} // Trigger stream on click
            >
              <Play size={20} className="mr-2" /> {buttonValue}
            </button>
          </div>

          {/* Right side: Video Stream */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              {streaming ? (
                <img
                  ref={videoRef}
                  alt="Video Stream"
                  className="rounded-lg w-full h-full object-cover z-10"
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
