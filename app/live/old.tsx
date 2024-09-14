"use client";

import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const VideoStream = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const videoRef = useRef<HTMLImageElement>(null);
  const latestFrame = useRef<string | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection with WebSocket-only transport
    const newSocket = io("http://127.0.0.1:5000", {
      transports: ["websocket"], // Force WebSocket connection, skip polling
    });

    setSocket(newSocket); // Set socket state

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
  }, []);

  return (
    <>
      <p>Here's the live camera feed:</p>
      <img ref={videoRef} alt="Video Stream" />
    </>
  );
};

export default VideoStream;
