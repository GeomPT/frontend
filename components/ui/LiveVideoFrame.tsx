"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; 
import io, { Socket } from "socket.io-client";

interface LiveVideoFrameProps {
  streaming: boolean;
  width: number;
  height: number;
  processingType: string;
  includeButton?: boolean;
}

export default function LiveVideoFrame({
  streaming,
  width,
  height,
  processingType,
  includeButton = false,
}: LiveVideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter(); // For redirecting

  const [userId, setUserId] = useState<string | null>(null);
  const [measurementState, setMeasurementState] = useState("idle");
  const [flashAnimation, setFlashAnimation] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const isConnectedRef = useRef(false);

  useEffect(() => {
    // Check for userId in localStorage
    const storedUserId = localStorage.getItem("userId");
    console.log("storedUserId", storedUserId);

    if (!storedUserId) {
      // Redirect if userId is missing
      router.push("/");
      return;
    }

    setUserId(storedUserId);

    if (!streaming) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    let stream: MediaStream;

    const startVideoStream = async () => {
      try {
        const constraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 },
          },
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (videoRef.current && canvasRef.current) {
          const videoSettings = stream.getVideoTracks()[0].getSettings();
          const videoWidth = videoSettings.width || width;
          const videoHeight = videoSettings.height || height;

          // Update canvas dimensions to match video dimensions
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startVideoStream();

    const newSocket = io("http://127.0.0.1:5000", {
      transports: ["websocket"],
      auth: {
        userId: storedUserId, // Send userId in auth
      },
    });



    socketRef.current = newSocket;

    newSocket.emit("start_processing", { processingType });

    newSocket.on("processed_frame", (frameData: ArrayBuffer) => {
      if (!isConnectedRef.current) {
        setIsConnected(true);
        isConnectedRef.current = true;
      }
      const blob = new Blob([frameData], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      if (imageRef.current) {
        const oldUrl = imageRef.current.src;
        imageRef.current.src = url;
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
      }
    });

    // Handle measurement events
    newSocket.on("measurement_complete", (data) => {
      setMeasurementState("complete");
      setFlashAnimation(true);
      setTimeout(() => setFlashAnimation(false), 250);
      setTimeout(() => setMeasurementState("idle"), 250);
    });

    newSocket.on("measurement_failed", (data) => {
      setMeasurementState("failed");
      setTimeout(() => setMeasurementState("idle"), 2000);
    });

    const FRAME_RATE = 30;
    let frameTimer: NodeJS.Timeout;

    const sendFrame = () => {
      if (
        videoRef.current &&
        canvasRef.current &&
        socketRef.current &&
        socketRef.current.connected
      ) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          canvasRef.current.toBlob(
            (blob) => {
              if (blob) {
                blob.arrayBuffer().then((buffer) => {
                  socketRef.current!.emit("send_frame", buffer);
                });
              }
            },
            "image/jpeg",
            1.0 // Set quality from 0 to 1
          );
        }
      }
    };

    frameTimer = setInterval(sendFrame, 1000 / FRAME_RATE);

    return () => {
      if (newSocket) {
        newSocket.off("processed_frame");
        newSocket.off("measurement_complete");
        newSocket.off("measurement_failed");
        newSocket.disconnect();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (frameTimer) {
        clearInterval(frameTimer);
      }
    };
  }, [streaming, processingType, width, height, router]);

  const handleBeginMeasurement = () => {
    if (
      measurementState === "idle" ||
      measurementState === "complete" ||
      measurementState === "failed"
    ) {
      socketRef.current?.emit("begin_measurement");
      setMeasurementState("in_progress");
    }
  };

  return (
    <>
      <div
        className="relative rounded-lg p-1 bg-gradient-to-r from-blue-500 to-pink-500 z-10"
        style={{
          width: "100%",
          maxWidth: `${width}px`,
          height: "auto",
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <div className="relative rounded-lg overflow-hidden">
          <video ref={videoRef} className="hidden" autoPlay playsInline />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute inset-0 bg-white -z-10"></div>
          <img
            ref={imageRef}
            alt="Processed Video Stream"
            className={`w-full h-full object-cover z-10 ${
              flashAnimation ? "flash-animation" : ""
            }`}
          />
        </div>
        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <h1 className="text-4xl text-black font-semibold">Connecting to camera...</h1>
          </div>
        )}
      </div>
      {includeButton && (
        <div className="flex flex-row justify-center items-center">
          <button
            onClick={handleBeginMeasurement}
            disabled={measurementState === "in_progress"}
            className="rounded-lg p-2 text-black mt-4 hover:bg-slate-50 shadow-md"
          >
            {measurementState === "idle" ||
            measurementState === "complete" ||
            measurementState === "failed"
              ? "Begin ROM Measurement"
              : measurementState === "in_progress"
              ? "Measuring..."
              : "Begin ROM Measurement"}
          </button>
        </div>
      )}
    </>
  );
}
