"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface LazyVideoProps {
    src: string;
    poster: string;
    label?: string;
}

export default function LazyVideo({
    src,
    poster,
    label = "Voir une fête en vidéo",
}: LazyVideoProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    // No <video> element is rendered in the DOM until the user clicks play —
    // no network request for the .mp4 fires before that.
    if (isPlaying) {
        return (
            <div className="relative w-full max-w-xs mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-lg bg-black">
                <video
                    src={src}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                />
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="relative w-full max-w-xs mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-lg block group"
            aria-label={label}
        >
            <img
                src={poster}
                alt={label}
                className="w-full h-full object-cover"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="bg-white/90 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="text-primary fill-primary" size={28} />
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-white font-heading font-bold text-sm">{label} 🎥</span>
            </div>
        </button>
    );
}
