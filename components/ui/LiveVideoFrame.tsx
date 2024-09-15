"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
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
    });

    socketRef.current = newSocket;

    newSocket.emit("start_processing", { processingType });

    newSocket.on("processed_frame", (frameData: ArrayBuffer) => {
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
        newSocket.disconnect();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (frameTimer) {
        clearInterval(frameTimer);
      }
    };
  }, [streaming, processingType, width, height]);

  return (
    <>
      <div
        className="relative border border-gray-300 rounded-lg overflow-hidden"
        style={{
          width: "100%",
          maxWidth: `${width}px`,
          height: "auto",
          aspectRatio: `${width} / ${height}`,
        }}
      >
        {/* Hidden video and canvas elements */}
        <video ref={videoRef} className="hidden" autoPlay playsInline />
        <canvas ref={canvasRef} className="hidden" />
        {/* Image element displaying the processed video stream */}
        <img
          ref={imageRef}
          alt="Processed Video Stream"
          className="w-full h-full object-cover"
        />
      </div>
      {includeButton && (
        <div className="flex flex-row justify-center items-center">
          <button onClick={() => socketRef.current?.emit("begin_measurement")} className="rounded-lg p-2 mt-4 hover:bg-slate-50 shadow-md">
            Begin ROM Measurement
          </button>
        </div>
      )}
    </>
  );
}
