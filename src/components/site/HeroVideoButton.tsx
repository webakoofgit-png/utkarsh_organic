import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function HeroVideoButton({ src }: { src: string }) {
  const [open, setOpen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wasFullscreen = useRef(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === playerRef.current && document.fullscreenElement) {
        wasFullscreen.current = true;
      } else if (wasFullscreen.current) {
        wasFullscreen.current = false;
        videoRef.current?.pause();
        setOpen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      videoRef.current?.pause();
      if (document.fullscreenElement && document.fullscreenElement === playerRef.current) {
        void document.exitFullscreen().catch(() => {});
      }
      setOpen(false);
      return;
    }

    // Mount the player during the click so playback and fullscreen retain user activation.
    flushSync(() => setOpen(true));
    void videoRef.current?.play().catch(() => {});
    // The dialog still fills the viewport when browser fullscreen is unavailable or denied.
    if (playerRef.current?.requestFullscreen) {
      void playerRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex w-auto max-w-full items-center justify-center gap-2 rounded-full border border-white/28 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-7"
        >
          <Expand className="h-4 w-4 text-beige" aria-hidden="true" />
          <span>See Full Video</span>
        </button>
      </DialogTrigger>
      <DialogContent
        ref={playerRef}
        aria-describedby={undefined}
        className="left-0 top-0 z-[100] block h-dvh w-screen max-w-none translate-x-0 translate-y-0 overflow-hidden rounded-none border-0 bg-black p-0 text-white sm:rounded-none data-[state=open]:animate-none data-[state=closed]:animate-none [&>button]:z-10 [&>button]:rounded-full [&>button]:bg-black/70 [&>button]:p-3 [&>button]:text-white [&>button]:opacity-100"
      >
        <DialogTitle className="sr-only">See Full Video</DialogTitle>
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          aria-label="Utkarsh Farm video"
          className="h-full w-full object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
