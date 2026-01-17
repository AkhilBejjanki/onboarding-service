const { EntitySchema } = require("typeorm");

const Notification = new EntitySchema({
  name: "Notification",
  tableName: "notifications",
  columns: {
    id: { type: Number, primary: true, generated: true },
    user_id: { type: Number },
    title: { type: String },
    body: { type: String },
    is_sent: { type: Boolean, default: false },
    created_at: { type: "timestamp", createDate: true },
  },
});

module.exports = { Notification };
