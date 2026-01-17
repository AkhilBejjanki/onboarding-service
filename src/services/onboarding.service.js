const REMINDER_RULES = {
  0: [24, 72, 120],      // hours → 1d, 3d, 5d
  1: [12, 24],           // hours
  2: [24, 48, 72, 120],  // hours
};

const REMINDER_MESSAGES = {
  0: [
    "Complete your account setup to get started",
    "Finish onboarding to unlock full features",
    "Still need help? Complete onboarding today",
  ],
  1: [
    "You're halfway there! Continue onboarding",
    "Complete the next onboarding step",
  ],
  2: [
    "Almost done! Finalize onboarding",
    "One step left to complete onboarding",
    "Need help finishing onboarding?",
    "Final reminder to complete onboarding",
  ],
};

module.exports = { REMINDER_RULES, REMINDER_MESSAGES };
