require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// 📧 EMAIL TRANSPORT
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔥 STATUS EMAIL ROUTE (USED BY DASHBOARD)
app.post("/send-status-email", async (req, res) => {
  const { email, name, items, total, status } = req.body;

  console.log("📩 STATUS EMAIL:", req.body);

  const itemList = items?.length
    ? items.map(i => `• ${i.name} x${i.qty} (₹${i.price})`).join("\n")
    : "No items";

  const mailOptions = {
    from: `"Cafe" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "☕ Order Update",

    text: `
Hi ${name},

Your order status: ${status}

-------------------------
${itemList}
-------------------------

Total: ₹${total}

If anything looks wrong, reply to this email to cancel.

— Cafe Team
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", email);
    res.send({ success: true });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).send("Email failed");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
});
