import Image from "next/image";
import { Product } from "@/data/products";
import { Check, Info } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col h-full">
            <div className="relative aspect-square bg-muted/50 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.isNew && (
                    <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        Nouveauté
                    </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-foreground flex items-center gap-1 shadow-sm">
                    <Info size={14} /> {product.age}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-sm text-green-600 font-medium">
                    <Check size={16} className="mr-2" /> Disponible en boutique
                </div>
            </div>
        </div>
    );
}
