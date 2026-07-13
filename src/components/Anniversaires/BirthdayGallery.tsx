"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export interface BirthdayPhoto {
    src: string;
    alt: string;
    theme?: string; // optional — omit when photos don't map to a specific theme
}

interface BirthdayGalleryProps {
    photos: BirthdayPhoto[];
}

export default function BirthdayGallery({ photos }: BirthdayGalleryProps) {
    // stopOnInteraction: false means a swipe/drag/click pauses autoplay
    // just long enough for the visitor to look (one "delay" cycle, 4s here),
    // then it resumes on its own — not a permanent stop.
    // stopOnMouseEnter pauses on desktop hover, resuming on mouse-leave.
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    // Lightbox state
    const [lightboxPhoto, setLightboxPhoto] = useState<BirthdayPhoto | null>(null);

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

    // Close lightbox on Escape key
    useEffect(() => {
        if (!lightboxPhoto) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxPhoto(null);
        };
        document.addEventListener("keydown", handleKey);
        // Prevent body scroll while lightbox is open
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [lightboxPhoto]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (!photos || photos.length === 0) return null;

    return (
        <>
            <div className="relative group">
                {/* Viewport */}
                <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {photos.map((photo, index) => (
                            <div
                                key={photo.src}
                                className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_38%]"
                            >
                                {/* Clickable slide — opens lightbox */}
                                <button
                                    type="button"
                                    className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md w-full block group/slide cursor-zoom-in"
                                    aria-label="Voir la photo en grand"
                                    onClick={() => setLightboxPhoto(photo)}
                                >
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover/slide:scale-105"
                                        // First two slides load eagerly (visible on entry),
                                        // the rest lazy-load as the user swipes toward them.
                                        priority={index < 2}
                                        loading={index < 2 ? undefined : "lazy"}
                                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 38vw"
                                    />
                                    {/* Zoom hint overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover/slide:bg-black/10 transition-colors flex items-center justify-center">
                                        <span className="opacity-0 group-hover/slide:opacity-100 transition-opacity bg-white/80 rounded-full p-2 shadow">
                                            <ZoomIn className="text-primary w-5 h-5" />
                                        </span>
                                    </div>
                                    {photo.theme && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                            <span className="text-white font-heading font-bold text-lg">
                                                {photo.theme}
                                            </span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
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

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {scrollSnaps.map((_, index) => (
                        <button
                            type="button"
                            aria-label={`Aller à la photo ${index + 1}`}
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                index === selectedIndex ? "bg-primary" : "bg-gray-200"
                            }`}
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox modal */}
            {lightboxPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setLightboxPhoto(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo en grand"
                >
                    {/* Image container — stops click from propagating to the backdrop */}
                    <div
                        className="relative w-full max-w-2xl max-h-[90vh] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={lightboxPhoto.src}
                            alt={lightboxPhoto.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 95vw, 672px"
                            priority
                        />
                    </div>

                    {/* Close button */}
                    <button
                        type="button"
                        aria-label="Fermer"
                        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                        onClick={() => setLightboxPhoto(null)}
                    >
                        <X className="text-gray-700 w-5 h-5" />
                    </button>
                </div>
            )}
        </>
    );
}
