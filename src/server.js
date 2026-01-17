require("reflect-metadata");
require("dotenv").config();

const app = require("./app");
const { AppDataSource } = require("./config/db");
require("./cron/onboarding.cron");

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
