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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = `Nouvelle demande d'anniversaire - ${formData.name}`;
        const body = `
Nom: ${formData.name}
Email/Tél: ${formData.email}
Date souhaitée: ${formData.date}
Âge fêté: ${formData.age} ans
Nombre d'enfants: ${formData.count}
Créneau: ${formData.slot}

Message:
${formData.message}
        `.trim();

        const mailtoLink = `mailto:contact@lmdpl.fr?cc=lamaisondespetitsloups@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        setSubmitted(true);
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
                <button
                    onClick={() => setSubmitted(false)}
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
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    Envoyer la demande <Send size={20} />
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                    * Ceci est une pré-réservation. Nous vous recontacterons pour valider les disponibilités (validation manuelle).
                </p>
            </form >
        </div >
    );
}
