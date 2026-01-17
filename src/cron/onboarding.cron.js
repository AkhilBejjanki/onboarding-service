const cron = require("node-cron");
const { AppDataSource } = require("../config/db");
const {
  REMINDER_RULES,
  REMINDER_MESSAGES,
} = require("../services/onboarding.service");
const { sendNotification } = require("../services/notification.service");

cron.schedule("*/1 * * * *", async () => {
  console.log("Running onboarding reminder cron...");

  const userRepo = AppDataSource.getRepository("User");
  const reminderRepo = AppDataSource.getRepository("OnboardingReminder");

  const users = await userRepo.find();
  const now = Date.now();

  for (const user of users) {
    const stage = user.onboarding_stage;
    const rules = REMINDER_RULES[stage];
    if (!rules) continue;

    const hoursSinceCreated =
      (now - new Date(user.created_at).getTime()) / (1000 * 60 * 60);

    for (let i = 0; i < rules.length; i++) {
      const reminderHour = rules[i];

      // Not yet eligible → stop checking further reminders
      if (hoursSinceCreated < reminderHour) break;

      try {
        // reminder insert
        await reminderRepo.save({
          user_id: user.id,
          stage,
          reminder_level: i,
        });

        // notify only if insert succeeds
        await sendNotification(
          user.id,
          `Onboarding Reminder (Stage ${stage})`,
          REMINDER_MESSAGES[stage][i]
        );

        // Send only ONE reminder per cron run
        break;
      } catch (err) {
        continue;
      }
    }
  }
});
