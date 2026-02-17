
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, date, age, count, slot, message } = body;

        // Create a transporter using OVH SMTP settings
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'contact@lmdpl.fr', // Your OVH email address
                pass: process.env.SMTP_PASSWORD, // Your OVH email password
            },
        });

        // Email content
        const mailOptions = {
            from: '"La Maison des Petits Loups" <contact@lmdpl.fr>',
            to: 'contact@lmdpl.fr',
            cc: 'lamaisondespetitsloups@gmail.com',
            replyTo: email, // Allows you to reply directly to the customer
            subject: `Nouvelle demande d'anniversaire - ${name}`,
            text: `
        Nouvelle demande de réservation :

        Nom: ${name}
        Email/Tél: ${email}
        Date souhaitée: ${date}
        Âge fêté: ${age} ans
        Nombre d'enfants: ${count}
        Créneau: ${slot}

        Message:
        ${message}
      `,
            html: `
        <h2>Nouvelle demande d'anniversaire</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email/Tél:</strong> ${email}</p>
        <p><strong>Date souhaitée:</strong> ${date}</p>
        <p><strong>Âge fêté:</strong> ${age} ans</p>
        <p><strong>Nombre d'enfants:</strong> ${count}</p>
        <p><strong>Créneau:</strong> ${slot}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}
