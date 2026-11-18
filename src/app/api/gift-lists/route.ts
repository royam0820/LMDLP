import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createGiftList, getAllGiftLists } from "@/lib/giftLists";

export async function GET() {
    try {
        const lists = await getAllGiftLists();
        return NextResponse.json({ lists });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la récupération des listes" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            childName,
            age,
            eventType,
            eventDate,
            parentName,
            parentEmail,
            parentPhone,
            welcomeMessage,
            items,
        } = body;

        if (!childName || !age || !parentEmail || !items || items.length === 0) {
            return NextResponse.json(
                { error: "Veuillez renseigner le prénom de l'enfant, l'âge, votre email et choisir au moins un article." },
                { status: 400 }
            );
        }

        const newList = await createGiftList({
            childName,
            age,
            eventType: eventType || "anniversaire",
            eventDate,
            parentName,
            parentEmail,
            parentPhone,
            welcomeMessage,
            items,
        });

        // Email notifications if SMTP configured
        if (process.env.SMTP_PASSWORD) {
            try {
                const transporter = nodemailer.createTransport({
                    host: "ssl0.ovh.net",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "contact@lmdpl.fr",
                        pass: process.env.SMTP_PASSWORD,
                    },
                });

                // 1. Notification to boutique
                const recipientEmail = "royam0820@gmail.com";
                const listUrl = `https://lmdpl.fr/liste/${newList.slug}`;

                await transporter.sendMail({
                    from: '"La Maison des Petits Loups" <contact@lmdpl.fr>',
                    to: recipientEmail,
                    replyTo: newList.parentEmail,
                    subject: `✨ Nouvelle liste créée pour ${newList.childName} (${newList.age})`,
                    text: `
Nouvelle liste de cadeaux créée sur le site !

ENFANT :
- Prénom : ${newList.childName}
- Âge : ${newList.age}
- Événement : ${newList.eventType} (${newList.eventDate || "Date non précisée"})

PARENT :
- Nom : ${newList.parentName || "Non renseigné"}
- Email : ${newList.parentEmail}
- Téléphone : ${newList.parentPhone || "Non renseigné (facultatif)"}

CADEAUX SÉLECTIONNÉS : ${newList.items.length} articles
LIEN DE LA LISTE : ${listUrl}
                    `,
                    html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #264653; background-color: #FFFDF7;">
                        <div style="background-color: #2A9D8F; padding: 18px; border-radius: 12px; text-align: center; color: white;">
                            <h1 style="margin: 0; font-size: 22px;">✨ Nouvelle Liste de Cadeaux</h1>
                            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.95;">
                                Pour <strong>${newList.childName} (${newList.age})</strong>
                            </p>
                        </div>

                        <div style="background-color: #ffffff; border-radius: 12px; padding: 20px; margin-top: 15px; border: 1px solid #eaeaea;">
                            <h2 style="font-size: 17px; margin-top: 0; color: #2A9D8F; border-bottom: 2px solid #2A9D8F; padding-bottom: 6px;">
                                Coordonnées du parent
                            </h2>
                            <p style="margin: 6px 0;"><strong>Nom :</strong> ${newList.parentName || "Non renseigné"}</p>
                            <p style="margin: 6px 0;"><strong>Email :</strong> <a href="mailto:${newList.parentEmail}" style="color: #2A9D8F;">${newList.parentEmail}</a></p>
                            <p style="margin: 6px 0;"><strong>Téléphone :</strong> ${newList.parentPhone ? `<a href="tel:${newList.parentPhone.replace(/\s/g, '')}" style="color: #2A9D8F; font-weight: bold;">${newList.parentPhone}</a>` : '<em style="color: #888;">Non renseigné</em>'}</p>
                            <p style="margin: 6px 0;"><strong>Événement :</strong> ${newList.eventType} (${newList.eventDate || "Date non précisée"})</p>
                            <p style="margin: 6px 0;"><strong>Nombre d'articles :</strong> ${newList.items.length}</p>
                        </div>

                        <div style="text-align: center; margin-top: 20px;">
                            <a href="${listUrl}" style="background-color: #F4A261; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: bold; display: inline-block;">
                                Voir la liste en ligne
                            </a>
                        </div>
                    </div>
                    `,
                }).catch((err) => console.warn("Failed to send boutique list creation notification:", err));

                // 2. Confirmation to parent
                await transporter.sendMail({
                    from: '"La Maison des Petits Loups" <contact@lmdpl.fr>',
                    to: newList.parentEmail,
                    subject: `🎈 Votre liste de cadeaux pour ${newList.childName} est en ligne !`,
                    text: `Bonjour ${newList.parentName || ""},\n\nVotre liste de cadeaux pour ${newList.childName} a bien été créée !\n\nVous pouvez désormais partager ce lien avec vos proches et invités :\n${listUrl}\n\nChaque invité pourra réserver ses cadeaux en évitant les doublons.\n\nÀ très bientôt,\nL'équipe de La Maison des Petits Loups\n2 Place du Théâtre, 92800 Puteaux\n01 47 72 73 71`,
                    html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #264653; line-height: 1.5;">
                        <h2 style="color: #2A9D8F; margin-top: 0;">Bonjour ${newList.parentName || ""} !</h2>
                        <p>La liste de cadeaux pour <strong>${newList.childName}</strong> est prête et en ligne ! 🎈</p>
                        <div style="background-color: #f7fbf9; border-left: 4px solid #2A9D8F; padding: 14px 18px; margin: 16px 0; border-radius: 6px;">
                            <p style="margin: 0; font-weight: bold; font-size: 16px;">Votre lien à partager à vos proches :</p>
                            <p style="margin: 8px 0 0 0;"><a href="${listUrl}" style="color: #2A9D8F; font-size: 15px; font-weight: bold; word-break: break-all;">${listUrl}</a></p>
                        </div>
                        <p>Vos proches pourront choisir leurs cadeaux en toute simplicité et les bloquer en direct pour éviter tout doublon.</p>
                        <p><strong>La Maison des Petits Loups</strong><br/>2 Place du Théâtre, 92800 Puteaux<br/>Tél : 01 47 72 73 71</p>
                    </div>
                    `,
                }).catch((err) => console.warn("Failed to send parent list confirmation:", err));
            } catch (mailError) {
                console.error("Nodemailer error on list creation:", mailError);
            }
        }

        return NextResponse.json(
            {
                success: true,
                slug: newList.slug,
                url: `/liste/${newList.slug}`,
                list: newList,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating gift list:", error);
        return NextResponse.json(
            { error: error.message || "Erreur lors de la création de la liste." },
            { status: 500 }
        );
    }
}
