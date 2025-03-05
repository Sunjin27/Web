const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your_email@gmail.com",
        pass: "your_email_password",
    },
});

app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "your_email@gmail.com",
        subject: `New Contact Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send("Email sent successfully!");
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
