const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* 🔐 SMTP CONFIG (GMAIL) */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "uluffy06@gmail.com",        // 🔁 replace
    pass: "epmidrustjaqjwta",           // 🔁 replace (NOT normal password)
  },
});

/* 📧 SEND ORDER STATUS EMAIL */
app.post("/send-status-email", async (req, res) => {
  const { email, name, status } = req.body;

  let subject = "";
  let message = "";

  // 🟡 PREPARING
  if (status === "preparing") {
    subject = "☕ Your order is being prepared";
    message = `
Hi ${name},

Good news! 🎉

Your order is now being prepared.

Sit tight — your coffee is on the way ☕

— Cafe Team
`;
  }

  // 🟢 DONE
  if (status === "done") {
    subject = "🚀 Your order is ready!";
    message = `
Hi ${name},

Your order is ready!

It will be served/delivered shortly 🚀

Enjoy your meal 😋

— Cafe Team
`;
  }

  try {
    await transporter.sendMail({
      from: '"Cafe" <your-email@gmail.com>', // 🔁 replace
      to: email,
      subject: subject,
      text: message,
    });

    console.log("📧 Email sent to:", email);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({ success: false });
  }
});

/* 🚀 SERVER */
app.listen(5000, () => {
  console.log("🚀 SMTP server running on http://localhost:5000");
});
