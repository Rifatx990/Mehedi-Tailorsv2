// controllers/notificationController.js
import pool from "../config/db.js";
import { sendEmail } from "../utils/emailService.js";

export const sendNotification = async (userId, title, message, email) => {
  await pool.query(
    `INSERT INTO notifications (user_id, title, message)
     VALUES ($1,$2,$3)`,
    [userId, title, message]
  );

  if (email) {
    await sendEmail(email, title, message);
  }
};

export const getMyNotifications = async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC",
    [req.user.id]
  );
  res.json(rows);
};
