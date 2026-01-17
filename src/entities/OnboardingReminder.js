const { EntitySchema } = require("typeorm");

const OnboardingReminder = new EntitySchema({
  name: "OnboardingReminder",
  tableName: "onboarding_reminders",
  columns: {
    id: { type: Number, primary: true, generated: true },
    user_id: { type: Number },
    stage: { type: Number },
    reminder_level: { type: Number },
    sent_at: { type: "timestamp", createDate: true },
  },
});

module.exports = { OnboardingReminder };
