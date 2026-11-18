# Prompt for Antigravity — Anniversaires page: photo gallery + click-to-play video

## Context

This is a Next.js 16 / React 19 / Tailwind project (repo: royam0820/LMDLP).
The page `src/app/(site)/anniversaires/page.tsx` currently shows one static
hero image. I want to add a photo carousel showing 10 different birthday
party themes, plus one short highlight video, without hurting mobile page
load — this site gets a lot of mobile traffic.

## Goal

1. Add a **photo carousel** (NOT the video) using `embla-carousel-react` +
   `embla-carousel-autoplay`, which are already installed and already used
   in `src/components/Home/ProductCarousel.tsx` — follow that file's style
   and conventions exactly (same button/dot pattern, same Tailwind classes
   where sensible).
2. Add a **click-to-play video** as a separate section below/after the
   gallery, not inside the carousel. It must not download any video bytes
   until the user explicitly taps play — no `autoplay`, no `preload="auto"`.
3. Wire both into `src/app/(site)/anniversaires/page.tsx`, inserted after
   the "Formule Anniversaire" block and before "Créneaux disponibles".

## Hard requirements

- Carousel autoplay must **pause temporarily when the user swipes, drags, or
  clicks a nav arrow, then resume automatically after one delay cycle**
  (use Embla Autoplay's `stopOnInteraction: false` — this is not a
  permanent stop, it gives the visitor a few seconds to look before
  autoplay continues). Also pause on mouse hover on desktop, resuming on
  mouse-leave.
- Photos lazy-load via `next/image` (only the first 1–2 slides should be
  eager/priority-loaded).
- Video component renders NO `<video>` element in the DOM until clicked —
  show a poster image with a play button overlay first.
- Use TypeScript, function components, "use client" where needed (Embla and
  the video's click state both require client components; the page itself
  can stay a server component).
- Match the existing design tokens already used on the page (rounded-2xl /
  rounded-3xl, shadow-lg, `font-heading`, `text-primary`, etc.) — don't
  introduce a new visual style.

## Assets (place these, don't invent new paths)

```
public/images/anniversaires/   ← 10 theme photos, e.g. pirates-1.jpg, licorne-1.jpg
public/videos/anniversaires/birthday-highlight.mp4          ← compressed video (~1.8MB)
public/videos/anniversaires/birthday-highlight-poster.jpg   ← poster frame, extract with:
  ffmpeg -i birthday-highlight.mp4 -ss 00:00:02 -vframes 1 birthday-highlight-poster.jpg
```

I'll drop the actual photo/video files into these folders myself — just
reference these paths in the code, don't fetch or generate placeholder
images from the internet.

## Reference implementation (use as the basis — adapt, don't reinvent)

### `src/components/Anniversaires/BirthdayGallery.tsx`

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BirthdayPhoto {
    src: string;
    alt: string;
    theme: string;
}

interface BirthdayGalleryProps {
    photos: BirthdayPhoto[];
}

export default function BirthdayGallery({ photos }: BirthdayGalleryProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onInit = useCallback((emblaApi: any) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: any) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on("reInit", onInit).on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (!photos || photos.length === 0) return null;

    return (
        <div className="relative group">
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
                <div className="flex -ml-4">
                    {photos.map((photo, index) => (
                        <div
                            key={photo.src}
                            className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_38%]"
                        >
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover"
                                    priority={index < 2}
                                    loading={index < 2 ? undefined : "lazy"}
                                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 38vw"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                    <span className="text-white font-heading font-bold text-lg">
                                        {photo.theme}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                aria-label="Photo précédente"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={scrollPrev}
            >
                <ChevronLeft className="text-primary" />
            </button>
            <button
                type="button"
                aria-label="Photo suivante"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={scrollNext}
            >
                <ChevronRight className="text-primary" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
                {scrollSnaps.map((_, index) => (
                    <button
                        type="button"
                        aria-label={`Aller à la photo ${index + 1}`}
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${index === selectedIndex ? "bg-primary" : "bg-gray-200"
                            }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
```

### `src/components/Anniversaires/LazyVideo.tsx`

```tsx
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
```

## Task

1. Create the two component files above under `src/components/Anniversaires/`
   (adapt only if something clashes with the codebase — explain any change).
2. Edit `src/app/(site)/anniversaires/page.tsx`:
   - Import both components.
   - Add a `birthdayPhotos: BirthdayPhoto[]` array with 10 placeholder
     entries pointing at `/images/anniversaires/theme-N.jpg` (I'll rename/
     replace the actual files after).
   - Insert a new section titled "🎨 Nos thèmes d'anniversaire" containing
     `<BirthdayGallery photos={birthdayPhotos} />`, positioned after the
     "Formule Anniversaire" block and before "Créneaux disponibles".
   - Below the gallery, add `<LazyVideo src="/videos/anniversaires/birthday-highlight.mp4" poster="/videos/anniversaires/birthday-highlight-poster.jpg" />`
     inside a centered wrapper, visually secondary (smaller / lower on the
     page) compared to the photo gallery.
3. Run the dev server and verify in the browser: carousel swipes correctly,
   autoplay stops on interaction/hover, video shows only a poster + play
   button and no network request for the .mp4 fires until clicked (check
   the Network tab).
4. Report back what changed, and flag anything you deviated from above and why.
