const { AppDataSource } = require("../config/db");

const sendNotification = async (userId, title, body) => {
  const repo = AppDataSource.getRepository("Notification");

  try {
    await repo.save({
      user_id: userId,
      title,
      body,
      is_sent: true,
    });

    console.log(`[NOTIFICATION] User ${userId}: ${title}`);
  } catch (err) {
  }
};

module.exports = { sendNotification };
