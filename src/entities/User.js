const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { type: Number, primary: true, generated: true },
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    onboarding_stage: { type: Number, default: 0 },
    created_at: { type: "timestamp", createDate: true },
  },
});

module.exports = { User };
