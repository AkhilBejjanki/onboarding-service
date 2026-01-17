const { EntitySchema } = require("typeorm");

const Complaint = new EntitySchema({
  name: "Complaint",
  tableName: "complaints",
  columns: {
    id: { type: Number, primary: true, generated: true },
    user_id: { type: Number },
    complaint_type: { type: String },
    status: { type: String },
    payload: { type: "jsonb" },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
    status_updated_at: { type: "timestamp" },
  },
});

module.exports = { Complaint };
