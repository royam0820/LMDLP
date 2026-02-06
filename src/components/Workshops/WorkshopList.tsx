import { Workshop } from "@/data/workshops";
import { Calendar, Clock, Euro, Users } from "lucide-react";

export default function WorkshopList({ workshops }: { workshops: Workshop[] }) {
    if (workshops.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/50 rounded-2xl">
                <p className="text-muted-foreground">Aucune date prévue pour le moment.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {workshops.map((workshop) => (
                <div
                    key={workshop.id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-heading font-bold text-xl text-foreground">
                            {workshop.title}
                        </h3>
                        {workshop.price && (
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <Euro size={12} /> {workshop.price}
                            </span>
                        )}
                    </div>

                    <p className="text-muted-foreground mb-6 line-clamp-2">
                        {workshop.description}
                    </p>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3 text-foreground">
                            <Calendar size={18} className="text-primary" />
                            <span className="font-medium">{workshop.dateStr}</span>
                        </div>
                        <div className="flex items-center gap-3 text-foreground">
                            <Users size={18} className="text-secondary" />
                            <span>Âge : {workshop.age}</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 border border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                        Réserver
                    </button>
                </div>
            ))}
        </div>
    );
}
