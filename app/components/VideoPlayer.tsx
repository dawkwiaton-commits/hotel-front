"use client";

import { useRef, useState, useEffect } from "react";

interface VideoPlayerProps {
  srcDesktop: string;
  srcMobile?: string;
  showControls?: boolean;
  startTime?: number; // start w sekundach
}

export default function VideoPlayer({
  srcDesktop,
  srcMobile,
  showControls,
  startTime,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  // Ustaw startTime i autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
  
    const handleLoaded = () => {
      if (startTime) video.currentTime = startTime;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // autoplay z dźwiękiem zablokowany → ustaw mute
          video.muted = true;
          video.play();
          setPlaying(true);
        });
      } else {
        setPlaying(true);
      }
    };
  
    video.addEventListener("loadedmetadata", handleLoaded);
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, [startTime]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const increaseVolume = () => {
    const video = videoRef.current;
    if (!video) return;
    const newVol = Math.min(volume + 0.1, 1);
    video.volume = newVol;
    setVolume(newVol);
  };

  const decreaseVolume = () => {
    const video = videoRef.current;
    if (!video) return;
    const newVol = Math.max(volume - 0.1, 0);
    video.volume = newVol;
    setVolume(newVol);
  };

  return (
    <div className="w-full h-full relative bg-black">
      <video
        ref={videoRef}
        src={srcDesktop}
        className="w-full h-full object-cover"
        muted // potrzebne do autoplay bez interakcji
        loop
        autoPlay
        playsInline // dla mobile
      />

      {showControls && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-black/40 rounded-md p-2">
          <button
            onClick={togglePlay}
            className="text-white px-3 py-1 rounded-md bg-brown-700 hover:bg-brown-900 transition"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            onClick={increaseVolume}
            className="text-white px-3 py-1 rounded-md bg-brown-700 hover:bg-brown-900 transition"
          >
            +
          </button>
          <button
            onClick={decreaseVolume}
            className="text-white px-3 py-1 rounded-md bg-brown-700 hover:bg-brown-900 transition"
          >
            -
          </button>
        </div>
      )}
    </div>
  );
}
