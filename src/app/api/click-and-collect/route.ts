import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { formatFrenchPhone } from '@/lib/formatPhone';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            customer,
            items,
            total,
        }: {
            customer: {
                name: string;
                phone: string;
                email: string;
                pickupDate: string;
                pickupSlot?: string;
                note?: string;
            };
            items: Array<{
                id: string;
                name: string;
                sku?: string;
                price?: number;
                quantity: number;
                age?: string;
            }>;
            total: number;
        } = body;

        if (customer?.phone) {
            customer.phone = formatFrenchPhone(customer.phone);
        }

        if (!customer?.name?.trim() || !customer?.phone?.trim() || !customer?.email?.trim() || !items || items.length === 0) {
            return NextResponse.json(
                { error: "Veuillez renseigner votre nom, téléphone, adresse email et au moins un article." },
                { status: 400 }
            );
        }

        // Format: CC-JJMM-XXXX (ex: CC-1710-8K4P) : très lisible sur un post-it en boutique
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let randomPart = '';
        for (let i = 0; i < 4; i++) {
            randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const reservationId = `CC-${day}${month}-${randomPart}`;
        const totalFormatted = total.toFixed(2).replace('.', ',');

        const itemsListText = items
            .map(
                (item) =>
                    `- ${item.name}${item.sku ? ` [Réf: ${item.sku}]` : ''} x${item.quantity} : ${(
                        (item.price || 0) * item.quantity
                    )
                        .toFixed(2)
                        .replace('.', ',')} €`
            )
            .join('\n');

        const itemsListHtml = items
            .map(
                (item) => `
                <tr style="border-bottom: 1px solid #f0f0f0;">
                    <td style="padding: 10px 8px; font-weight: 500;">
                        ${item.name}
                        ${item.sku ? `<div style="font-size: 11px; color: #64748B; font-family: monospace;">Réf : ${item.sku}</div>` : ''}
                    </td>
                    <td style="padding: 10px 8px; text-align: center;">${item.quantity}</td>
                    <td style="padding: 10px 8px; text-align: right; color: #2A9D8F; font-weight: 600;">
                        ${((item.price || 0) * item.quantity).toFixed(2).replace('.', ',')} €
                    </td>
                </tr>`
            )
            .join('');

        // Recipient for testing: royam0820@gmail.com (as requested by user)
        const recipientEmail = 'royam0820@gmail.com';

        const subject = `🛍️ Réservation Click & Collect #${reservationId} - ${customer.name}`;

        const textContent = `
Nouvelle réservation Click & Collect (#${reservationId}) :

CLIENT :
- Nom : ${customer.name}
- Téléphone : ${customer.phone}
- Email : ${customer.email || 'Non renseigné'}

RETRAIT EN BOUTIQUE SOUHAITÉ :
- Date : ${customer.pickupDate || 'Dès que possible'}
- Créneau horaire : ${customer.pickupSlot || 'Non précisé'}
- Note / Remarque : ${customer.note || 'Aucune'}

ARTICLES COMMANDÉS :
${itemsListText}

MONTANT TOTAL : ${totalFormatted} €
(Règlement sur place en caisse habituelle)
        `;

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #264653; background-color: #FFFDF7;">
            <div style="background-color: #F4A261; padding: 18px; border-radius: 12px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 22px;">Nouvelle Réservation Click & Collect</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.95;">Référence : <strong>#${reservationId}</strong></p>
            </div>

            <div style="background-color: #ffffff; border-radius: 12px; padding: 20px; margin-top: 15px; border: 1px solid #eaeaea;">
                <h2 style="font-size: 17px; margin-top: 0; color: #2A9D8F; border-bottom: 2px solid #2A9D8F; padding-bottom: 6px;">
                    Coordonnées du client
                </h2>
                <p style="margin: 6px 0;"><strong>Nom :</strong> ${customer.name}</p>
                <p style="margin: 6px 0;"><strong>Téléphone :</strong> <a href="tel:${customer.phone}" style="color: #2A9D8F; font-weight: bold;">${customer.phone}</a></p>
                <p style="margin: 6px 0;"><strong>Email :</strong> ${customer.email || 'Non renseigné'}</p>
                <p style="margin: 6px 0;"><strong>Date de passage prévue :</strong> ${customer.pickupDate || 'Dès que possible'}</p>
                <p style="margin: 6px 0;"><strong>Créneau :</strong> ${customer.pickupSlot || 'Non précisé'}</p>
                ${customer.note ? `<p style="margin: 6px 0; background: #fdf6ec; padding: 8px 12px; border-left: 3px solid #E9C46A; border-radius: 4px;"><strong>Remarque :</strong> ${customer.note}</p>` : ''}
            </div>

            <div style="background-color: #ffffff; border-radius: 12px; padding: 20px; margin-top: 15px; border: 1px solid #eaeaea;">
                <h2 style="font-size: 17px; margin-top: 0; color: #2A9D8F; border-bottom: 2px solid #2A9D8F; padding-bottom: 6px;">
                    Articles réservés
                </h2>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <thead>
                        <tr style="background-color: #f8f8f8; color: #666; text-align: left;">
                            <th style="padding: 8px;">Article</th>
                            <th style="padding: 8px; text-align: center;">Qté</th>
                            <th style="padding: 8px; text-align: right;">Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsListHtml}
                    </tbody>
                </table>

                <div style="margin-top: 18px; text-align: right; border-top: 2px solid #eee; padding-top: 12px;">
                    <span style="font-size: 16px; font-weight: bold;">Total à encaisser sur place : </span>
                    <span style="font-size: 20px; font-weight: bold; color: #2A9D8F;">${totalFormatted} €</span>
                </div>
            </div>

            <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
                <p>La Maison des Petits Loups — 2 Place du Théâtre, 92800 Puteaux — 01 47 72 73 71</p>
                <p style="color: #F4A261; font-weight: bold;">(Rappel : Les articles sont à préparer avec un post-it au nom du client)</p>
            </div>
        </div>
        `;

        // If SMTP_PASSWORD is set, try to send the email
        if (process.env.SMTP_PASSWORD) {
            try {
                const transporter = nodemailer.createTransport({
                    host: 'ssl0.ovh.net',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'contact@lmdpl.fr',
                        pass: process.env.SMTP_PASSWORD,
                    },
                });

                await transporter.sendMail({
                    from: '"La Maison des Petits Loups" <contact@lmdpl.fr>',
                    to: recipientEmail,
                    replyTo: customer.email || 'contact@lmdpl.fr',
                    subject,
                    text: textContent,
                    html: htmlContent,
                });

                // If customer provided an email, send them a confirmation copy
                if (customer.email) {
                    await transporter.sendMail({
                        from: '"La Maison des Petits Loups" <contact@lmdpl.fr>',
                        to: customer.email,
                        subject: `Confirmation de votre réservation Click & Collect #${reservationId} - La Maison des Petits Loups`,
                        text: `Bonjour ${customer.name},\n\nVotre réservation a bien été enregistrée !\nNotre équipe prépare votre paquet à la boutique.\n\nRappel : vous réglez vos articles directement sur place lors de votre venue.\n\nAdresse : 2 Place du Théâtre, 92800 Puteaux.\n\nEn cas de changement concernant votre commande, notre équipe vous contactera directement.\n\nÀ très vite !`,
                        html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #264653; line-height: 1.5;">
                            <h2 style="color: #2A9D8F; margin-top: 0;">Bonjour ${customer.name},</h2>
                            <p>Votre réservation Click & Collect <strong>#${reservationId}</strong> a bien été enregistrée !</p>
                            <p>Nous préparons vos articles avec soin à la boutique.</p>
                            <div style="background-color: #f7fbf9; border-left: 4px solid #2A9D8F; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
                                <p style="margin: 0; font-weight: bold; color: #2A9D8F;">Rappel important :</p>
                                <p style="margin: 4px 0 0 0;">Aucun prélèvement n'a été fait en ligne. Vous réglez vos articles (<strong>${totalFormatted} €</strong>) directement sur place lors de votre venue.</p>
                            </div>
                            <p><strong>Lieu de retrait :</strong> La Maison des Petits Loups, 2 Place du Théâtre, 92800 Puteaux</p>
                            <p><strong>Date prévue :</strong> ${customer.pickupDate || 'Dès que possible'} (${customer.pickupSlot || 'Aux horaires de la boutique'})</p>
                            <p style="font-size: 13px; color: #64748B; background-color: #F8FAFC; border: 1px solid #CBD5E1; padding: 10px 14px; border-radius: 8px; margin: 18px 0;">
                                💬 <em>En cas de changement concernant vos articles, notre équipe vous contactera directement.</em>
                            </p>
                            <p style="margin-top: 18px;">À très bientôt en magasin !</p>
                        </div>
                        `,
                    }).catch((err) => console.warn("Failed to send customer copy email:", err));
                }
            } catch (mailError) {
                console.error("Nodemailer error:", mailError);
                // In local dev, don't fail the user if SMTP is not configured or blocked
            }
        } else {
            console.log("ℹ️ [Click & Collect Local Simulation] Email would be sent to:", recipientEmail);
            console.log(textContent);
        }

        return NextResponse.json(
            {
                success: true,
                reservationId,
                message: "Réservation enregistrée avec succès !",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error handling click and collect reservation:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de l'enregistrement de votre réservation." },
            { status: 500 }
        );
    }
}
