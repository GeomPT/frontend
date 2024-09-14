import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

interface LiveVideoFrameProps {
  streaming: boolean;
  width: number;
  height: number;
}

export default function LiveVideoFrame({
  streaming,
  width,
  height,
}: LiveVideoFrameProps) {
  const videoRef = useRef<HTMLImageElement>(null);
  const latestFrame = useRef<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!streaming) {
      // Disconnect if streaming stops
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    // Initialize WebSocket connection
    const newSocket = io("http://127.0.0.1:5000", {
      transports: ["websocket"],
    });

    socketRef.current = newSocket;

    // Request video stream
    newSocket.emit("video_stream");

    // Handle incoming video frames
    newSocket.on("video_frame", (frameData: ArrayBuffer) => {
      const blob = new Blob([frameData], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      latestFrame.current = url;
    });

    // Render frames efficiently
    const renderFrame = () => {
      if (latestFrame.current && videoRef.current) {
        const oldUrl = videoRef.current.src;
        videoRef.current.src = latestFrame.current;
        latestFrame.current = null;

        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
      }
      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);

    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [streaming]);

  return (
    <img
      ref={videoRef}
      alt="Video Stream"
      width={width}
      height={height}
      className="rounded-lg w-full h-full object-cover z-10"
    />
  );
}
