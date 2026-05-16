import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import kareliaTrack from "@assets/Долго Карелия будет сниться_1764000729303.mp3";
import spaceOtterTrack from "@assets/space otter (Cover)_1764000873408.mp3";
import imagoTrack from "@assets/Imago_1764000941383.mp3";

interface MusicTrack {
  title: string;
  filename: string;
  description: string;
}

interface MusicPlayerProps {
  tracks: MusicTrack[];
}

const trackUrlMap: Record<string, string> = {
  "Долго Карелия будет сниться_1764000729303.mp3": kareliaTrack,
  "space otter (Cover)_1764000873408.mp3": spaceOtterTrack,
  "Imago_1764000941383.mp3": imagoTrack,
};

export function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      // Автоматически переключаем на следующий трек
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
        setTimeout(() => {
          setIsPlaying(true);
        }, 100);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, tracks.length]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="space-y-6">
      {/* Основной плеер */}
      <div className="liquid-glass rounded-xl p-6 iridescent-border">
        <div className="space-y-4">
          {/* Информация о треке */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-rainbow-purple to-rainbow-pink bg-clip-text text-transparent">
              {currentTrack.title}
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {currentTrack.description}
            </p>
          </div>

          {/* Прогресс бар */}
          <div className="space-y-2">
            <div
              onClick={handleProgressClick}
              className="h-2 bg-black/20 rounded-full cursor-pointer group relative overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-rainbow-purple via-rainbow-pink to-rainbow-cyan rounded-full transition-all relative"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer-smooth" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Управление */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleMute}
              data-testid="button-mute-toggle"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            
            <Button
              size="icon"
              variant="default"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full"
              data-testid="button-play-toggle"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>

            <div className="w-10" />
          </div>

          {/* Скрытый audio элемент */}
          <audio
            ref={audioRef}
            src={trackUrlMap[currentTrack.filename]}
            preload="metadata"
          />
        </div>
      </div>

      {/* Список треков */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">Примеры композиций</h4>
        <div className="grid gap-3">
          {tracks.map((track, index) => (
            <div
              key={index}
              onClick={() => selectTrack(index)}
              className={`liquid-glass rounded-lg p-4 cursor-pointer transition-all hover-elevate active-elevate-2 ${
                currentTrackIndex === index ? "ring-2 ring-rainbow-purple" : ""
              }`}
              data-testid={`track-item-${index}`}
            >
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant={currentTrackIndex === index && isPlaying ? "default" : "ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentTrackIndex === index) {
                      togglePlay();
                    } else {
                      selectTrack(index);
                      setTimeout(() => setIsPlaying(true), 100);
                    }
                  }}
                  data-testid={`button-track-play-${index}`}
                >
                  {currentTrackIndex === index && isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
                
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold truncate">{track.title}</h5>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {track.description}
                  </p>
                </div>

                {currentTrackIndex === index && (
                  <Badge variant="secondary" className="shrink-0">
                    Играет
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
