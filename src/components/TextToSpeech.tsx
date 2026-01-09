import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const getPageText = useCallback(() => {
    // Get main content text, excluding navigation and footer
    const main = document.querySelector("main");
    if (!main) return "";
    
    // Clone the element to avoid modifying the DOM
    const clone = main.cloneNode(true) as HTMLElement;
    
    // Remove elements we don't want to read
    const excludeSelectors = ["nav", "button", "script", "style", "noscript"];
    excludeSelectors.forEach((selector) => {
      clone.querySelectorAll(selector).forEach((el) => el.remove());
    });
    
    return clone.innerText || "";
  }, []);

  const speak = useCallback(() => {
    if (!("speechSynthesis" in window)) {
      console.error("Text-to-speech not supported");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const text = getPageText();
    if (!text.trim()) return;

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = 0.9;
    newUtterance.pitch = 1;
    newUtterance.volume = 1;

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    newUtterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
    setIsPlaying(true);
    setIsPaused(false);
  }, [getPageText]);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const handleClick = () => {
    if (!isPlaying) {
      speak();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Check if speech synthesis is supported
  if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {isPlaying && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={stop}
                size="icon"
                variant="destructive"
                className="h-12 w-12 rounded-full shadow-lg"
              >
                <VolumeX className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Stop reading</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              size="icon"
              variant="default"
              className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              {!isPlaying ? (
                <Volume2 className="h-6 w-6" />
              ) : isPaused ? (
                <Play className="h-6 w-6" />
              ) : (
                <Pause className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>
              {!isPlaying
                ? "Read page aloud"
                : isPaused
                ? "Resume reading"
                : "Pause reading"}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default TextToSpeech;
