const { DataSource } = require("typeorm");
const { User } = require("../entities/User");
const { Complaint } = require("../entities/Complaint");
const { Notification } = require("../entities/Notification");
const { OnboardingReminder } = require("../entities/OnboardingReminder");
const env = require("./env");

const AppDataSource = new DataSource({
  type: "postgres",
  url: env.DB_URL,
  synchronize: true,
  entities: [User, Complaint, Notification, OnboardingReminder],
});

module.exports = { AppDataSource };
