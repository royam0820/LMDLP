"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/data/products";
import ProductCard from "@/components/Shop/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ products }: { products: Product[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
        Autoplay({ delay: 3000, stopOnInteraction: false }),
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

    // Limit to max 8 items
    const displayProducts = products.slice(0, 8);

    return (
        <div className="relative group">
            {/* Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4 py-8 px-1">
                    {displayProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                        >
                            <ProductCard product={product} truncate={true} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10 disabled:opacity-0"
                onClick={scrollPrev}
            >
                <ChevronLeft className="text-primary" />
            </button>
            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10 disabled:opacity-0"
                onClick={scrollNext}
            >
                <ChevronRight className="text-primary" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${index === selectedIndex ? "bg-primary" : "bg-gray-200"
                            }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
