import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // 1️⃣ Save to MongoDB
    const newMessage = await Contact.create({ name, email, message });

    // 2️⃣ Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // 3️⃣ Send email to YOU
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `📩 New Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // 4️⃣ Auto-reply to USER
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✅ Message Received",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! I’ve received your message and will get back to you soon.</p>
        <br/>
        <p>— Zubair</p>
      `,
    });

    res.status(200).json({
      success: true,
      msg: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};