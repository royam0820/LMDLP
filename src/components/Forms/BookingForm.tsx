"use client";

import { useState } from "react";
import { Calendar, Users, Gift, MessageSquare, Send, Clock } from "lucide-react";

export default function BookingForm() {
    const [formData, setFormData] = useState({
        date: "",
        age: "",
        count: "8",
        name: "",
        email: "",
        slot: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de l\'envoi.');
            }

            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Demande envoyée !</h3>
                <p className="text-green-700">
                    Merci {formData.name} ! Nous avons bien reçu votre demande pour l'anniversaire de votre enfant. Nous vous rappellerons très vite pour confirmer la date.
                </p>
                <div className="mt-4 text-sm text-green-600">
                    Un email de confirmation a été envoyé à notre équipe.
                </div>
                <button
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({
                            date: "",
                            age: "",
                            count: "8",
                            name: "",
                            email: "",
                            slot: "",
                            message: "",
                        });
                    }}
                    className="mt-6 text-sm text-green-600 hover:text-green-800 underline"
                >
                    Envoyer une autre demande
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h3 className="font-heading font-bold text-2xl mb-6 text-center text-primary">
                Réserver une date
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Parent Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Votre Nom</label>
                        <div className="relative">
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Jean Dupont"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email / Téléphone</label>
                        <div className="relative">
                            <input
                                required
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="06 00 00 00 00"
                            />
                        </div>
                    </div>
                </div>

                {/* Child Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Calendar size={16} className="text-primary" /> Date souhaitée
                        </label>
                        <input
                            required
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Gift size={16} className="text-primary" /> Âge fêté
                        </label>
                        <select
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                        >
                            <option value="">Sélectionner</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1} ans</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Users size={16} className="text-primary" /> Nombre d'enfants (approx.)
                    </label>
                    <input
                        type="number"
                        name="count"
                        min="1"
                        max="15"
                        value={formData.count}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>



                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Clock size={16} className="text-primary" /> Créneau souhaité
                    </label>
                    <select
                        name="slot"
                        value={formData.slot}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    >
                        <option value="">Sélectionner un horaire</option>
                        <option value="10h30-12h30">10h30 – 12h30</option>
                        <option value="13h30-15h30">13h30 – 15h30</option>
                        <option value="16h30-18h30">16h30 – 18h30</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageSquare size={16} className="text-primary" /> Message / Précisions
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="Thème particulier, allergies, questions..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Envoi en cours...' : 'Envoyer la demande'} <Send size={20} />
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                    * Ceci est une pré-réservation. Nous vous recontacterons pour valider les disponibilités (validation manuelle).
                </p>
            </form >
        </div >
    );
}
