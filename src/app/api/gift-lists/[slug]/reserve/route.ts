import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { reserveGiftItems, GiftListItem } from "@/lib/giftLists";
import { formatFrenchPhone } from "@/lib/formatPhone";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const {
            productIds,
            productId,
            guestName,
            guestPhone,
            guestEmail,
            guestNote,
            pickupDate,
            pickupSlot,
        } = body;

        const normalizedPhone = formatFrenchPhone(guestPhone);

        // Support both single productId and batch productIds array
        const idsToReserve: string[] = Array.isArray(productIds) && productIds.length > 0
            ? productIds
            : (productId ? [productId] : []);

        if (idsToReserve.length === 0 || !guestName?.trim() || !normalizedPhone || !guestEmail?.trim()) {
            return NextResponse.json(
                { error: "Veuillez sélectionner au moins un cadeau et renseigner votre nom, téléphone et email." },
                { status: 400 }
            );
        }

        const result = await reserveGiftItems(slug, idsToReserve, {
            guestName,
            guestPhone: normalizedPhone,
            guestEmail,
            guestNote,
            pickupDate,
            pickupSlot,
        });

        if (!result.success || !result.items || !result.list) {
            return NextResponse.json(
                { error: result.error || "Impossible de réserver ces articles." },
                { status: 400 }
            );
        }

        const list = result.list;
        const reservedItems = result.items;
        const totalAmount = reservedItems.reduce((acc, it) => acc + (it.price || 0), 0);
        const totalFormatted = totalAmount > 0 ? `${totalAmount.toFixed(2).replace(".", ",")} €` : null;

        // Recipient for boutique notification
        const recipientEmail = "royam0820@gmail.com";
        const subject = reservedItems.length > 1
            ? `🎁 ${reservedItems.length} cadeaux réservés pour ${list.childName} (${list.age}) par ${guestName}`
            : `🎁 Cadeau réservé pour ${list.childName} (${list.age}) par ${guestName}`;

        // Plain text items list
        const itemsListText = reservedItems
            .map((it) => {
                const pr = it.price ? `${it.price.toFixed(2).replace(".", ",")} €` : "Prix en boutique";
                return `- ${it.name}${it.sku ? ` [Réf: ${it.sku}]` : ""} (${pr})`;
            })
            .join("\n");

        const textContent = `
Nouvelle réservation sur la liste de ${list.childName} !

LISTE :
- Enfant : ${list.childName} (${list.age})
- Événement : ${list.eventType} (${list.eventDate || "Date non précisée"})
- Lien de la liste : https://lmdpl.fr/liste/${list.slug}
- Parent : ${list.parentName || "Non renseigné"} (${list.parentEmail}${list.parentPhone ? ` — Tél : ${list.parentPhone}` : ""})

CADEAUX RÉSERVÉS (${reservedItems.length}) :
${itemsListText}
${totalFormatted ? `\nMONTANT TOTAL : ${totalFormatted}\n` : ""}
INVITÉ / PROCHE :
- Nom : ${guestName}
- Téléphone : ${guestPhone}
- Email : ${guestEmail || "Non renseigné"}
- Petit mot doux : ${guestNote || "Aucun"}
- Date de passage en boutique : ${pickupDate || "Dès que possible"} (${pickupSlot || "Créneau non précisé"})

RAPPEL BOUTIQUE :
Préparer les paquets avec un post-it : « Cadeaux pour ${list.childName} - Réservés par ${guestName} ».
L'invité réglera à la caisse habituelle lors de son passage.
        `;

        // HTML items rows for emails
        const itemsHtmlRows = reservedItems
            .map((it, idx) => {
                const pr = it.price ? `${it.price.toFixed(2).replace(".", ",")} €` : "Prix en boutique";
                const borderBottom = idx < reservedItems.length - 1 ? "border-bottom: 1px solid #f0f0f0;" : "";
                return `
                <tr style="${borderBottom}">
                    <td style="padding: 10px 8px; vertical-align: middle; text-align: left;">
                        <strong style="font-size: 15px; color: #264653;">${it.name}</strong>
                        ${it.sku ? `<div style="font-size: 11px; color: #64748B; font-family: monospace; margin-top: 2px;">Réf : ${it.sku}</div>` : ""}
                        ${it.age ? `<div style="font-size: 12px; color: #888; margin-top: 2px;">Âge : ${it.age}</div>` : ""}
                    </td>
                    <td style="padding: 10px 8px; vertical-align: middle; text-align: right; font-size: 16px; font-weight: bold; color: #2A9D8F; white-space: nowrap;">
                        ${pr}
                    </td>
                </tr>
                `;
            })
            .join("");

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #264653; background-color: #FFFDF7;">
            <div style="background-color: #2A9D8F; padding: 18px; border-radius: 12px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 22px;">🎁 ${reservedItems.length > 1 ? "Cadeaux Réservés sur une Liste" : "Cadeau Réservé sur une Liste"}</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.95;">
                    Pour <strong>${list.childName} (${list.age})</strong>
                    ${list.parentPhone ? `<br/><span style="font-size: 12px; opacity: 0.95;">Parent : ${list.parentName || "Parent"} — Tél : <a href="tel:${list.parentPhone.replace(/\s/g, "")}" style="color: white; font-weight: bold; text-decoration: underline;">${list.parentPhone}</a></span>` : ""}
                </p>
            </div>

            <div style="background-color: #ffffff; border-radius: 12px; padding: 20px; margin-top: 15px; border: 1px solid #eaeaea;">
                <h2 style="font-size: 17px; margin-top: 0; color: #2A9D8F; border-bottom: 2px solid #2A9D8F; padding-bottom: 6px;">
                    ${reservedItems.length > 1 ? `Articles choisis (${reservedItems.length})` : "Article choisi"}
                </h2>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; width: 100%;">
                    ${itemsHtmlRows}
                    ${totalFormatted && reservedItems.length > 1 ? `
                    <tr style="border-top: 2px solid #2A9D8F;">
                        <td style="padding: 12px 8px; font-weight: bold; font-size: 16px; color: #264653;">
                            Total estimé
                        </td>
                        <td style="padding: 12px 8px; text-align: right; font-weight: bold; font-size: 18px; color: #2A9D8F;">
                            ${totalFormatted}
                        </td>
                    </tr>
                    ` : ""}
                </table>
            </div>

            <div style="background-color: #ffffff; border-radius: 12px; padding: 20px; margin-top: 15px; border: 1px solid #eaeaea;">
                <h2 style="font-size: 17px; margin-top: 0; color: #2A9D8F; border-bottom: 2px solid #2A9D8F; padding-bottom: 6px;">
                    Coordonnées de l'invité
                </h2>
                <p style="margin: 6px 0;"><strong>Réservé par :</strong> ${guestName}</p>
                <p style="margin: 6px 0;"><strong>Téléphone :</strong> <a href="tel:${guestPhone}" style="color: #2A9D8F; font-weight: bold;">${guestPhone}</a></p>
                <p style="margin: 6px 0;"><strong>Email :</strong> <a href="mailto:${guestEmail}" style="color: #2A9D8F;">${guestEmail}</a></p>
                <p style="margin: 6px 0;"><strong>Date de passage prévue :</strong> ${pickupDate || "Dès que possible"}</p>
                <p style="margin: 6px 0;"><strong>Créneau :</strong> ${pickupSlot || "Non précisé"}</p>
                ${guestNote ? `<p style="margin: 10px 0 0 0; background: #FFFDF7; padding: 10px 14px; border-left: 3px solid #F4A261; border-radius: 4px; font-style: italic;">« ${guestNote} »</p>` : ""}
            </div>

            <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
                <p>La Maison des Petits Loups — 2 Place du Théâtre, 92800 Puteaux — 01 47 72 73 71</p>
                <p style="color: #F4A261; font-weight: bold;">(Glisser un post-it sur les paquets au nom de ${guestName} pour ${list.childName})</p>
            </div>
        </div>
        `;

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

                await transporter.sendMail({
                    from: '"La Maison des Petits Loups" <contact@lmdpl.fr>',
                    to: recipientEmail,
                    replyTo: guestEmail || "contact@lmdpl.fr",
                    subject,
                    text: textContent,
                    html: htmlContent,
                });

                // Send guest confirmation copy if email provided
                if (guestEmail) {
                    const guestSubject = reservedItems.length > 1
                        ? `Confirmation : Vos ${reservedItems.length} cadeaux réservés pour ${list.childName} !`
                        : `Confirmation : Vous avez réservé un cadeau pour ${list.childName} !`;

                    const guestText = `Bonjour ${guestName},\n\nMerci beaucoup ! Votre réservation de ${reservedItems.length > 1 ? `vos ${reservedItems.length} cadeaux` : `votre cadeau`} pour ${list.childName} a bien été enregistrée :\n\n${itemsListText}\n${totalFormatted ? `\nMontant total : ${totalFormatted}\n` : ""}\nIls sont maintenant marqués comme réservés à votre nom sur la liste afin d'éviter tout doublon.\n\nVous pourrez passer régler et retirer le tout directement au magasin (2 Place du Théâtre, 92800 Puteaux).\n\nEn cas de changement concernant votre sélection, notre équipe vous contactera directement.\n\nÀ très bientôt en magasin !`;

                    const guestHtml = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #264653; line-height: 1.5;">
                        <h2 style="color: #2A9D8F; margin-top: 0;">Bonjour ${guestName},</h2>
                        <p>Merci beaucoup ! Votre sélection pour <strong>${list.childName}</strong> est bien réservée :</p>
                        <div style="background-color: #f7fbf9; border-left: 4px solid #2A9D8F; padding: 14px 18px; margin: 16px 0; border-radius: 6px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                ${itemsHtmlRows}
                                ${totalFormatted && reservedItems.length > 1 ? `
                                <tr style="border-top: 2px solid #2A9D8F;">
                                    <td style="padding: 10px 8px 0 8px; font-weight: bold; font-size: 15px; color: #264653;">
                                        Total à régler en boutique
                                    </td>
                                    <td style="padding: 10px 8px 0 8px; text-align: right; font-weight: bold; font-size: 17px; color: #2A9D8F;">
                                        ${totalFormatted}
                                    </td>
                                </tr>
                                ` : ""}
                            </table>
                            ${guestNote ? `<p style="margin: 12px 0 0 0; padding-top: 10px; border-top: 1px dashed #CBD5E1; font-style: italic; color: #666; font-size: 14px;">Votre mot doux : « ${guestNote} »</p>` : ""}
                        </div>
                        <p>Les articles sont maintenant marqués comme <strong>réservés par vous</strong> sur la liste pour éviter tout doublon avec les autres proches.</p>
                        <p><strong>Lieu de retrait & règlement :</strong></p>
                        <p style="margin-top: 4px;">La Maison des Petits Loups<br/>2 Place du Théâtre, 92800 Puteaux<br/>Tél : 01 47 72 73 71<br/>Email : contact@lmdpl.fr</p>
                        <p><strong>Date de passage prévue :</strong> ${pickupDate || "Dès que possible"} (${pickupSlot || "Aux horaires de la boutique"})</p>
                        <p style="font-size: 13px; color: #64748B; background-color: #F8FAFC; border: 1px solid #CBD5E1; padding: 10px 14px; border-radius: 8px; margin: 18px 0;">
                            💬 <em>En cas de changement concernant votre sélection, notre équipe vous contactera directement.</em>
                        </p>
                        <p style="margin-top: 18px;">À très bientôt en magasin !</p>
                    </div>
                    `;

                    await transporter.sendMail({
                        from: '"La Maison des Petits Loups" <contact@lmdpl.fr>',
                        to: guestEmail,
                        replyTo: "contact@lmdpl.fr",
                        subject: guestSubject,
                        text: guestText,
                        html: guestHtml,
                    });
                    console.log(`✅ [Gift List] Confirmation copy successfully sent to guest: ${guestEmail}`);
                }
            } catch (mailError) {
                console.error("Nodemailer error:", mailError);
            }
        } else {
            console.log("ℹ️ [Gift List Local Simulation] Email would be sent to:", recipientEmail);
            console.log(textContent);
        }

        return NextResponse.json({
            success: true,
            items: reservedItems,
            item: reservedItems[0],
            list,
        });
    } catch (error: any) {
        console.error("Error reserving gift items:", error);
        return NextResponse.json(
            { error: error.message || "Erreur lors de la réservation." },
            { status: 500 }
        );
    }
}
