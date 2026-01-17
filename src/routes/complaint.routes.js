const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { AppDataSource } = require("../config/db");
const { isValidTransition } = require("../services/complaint.service");
const { sendNotification } = require("../services/notification.service");


const repo = () => AppDataSource.getRepository("Complaint");


/**
 * @swagger
 * /complaints:
 *   post:
 *     summary: Create a new complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               complaint_type:
 *                 type: string
 *               payload:
 *                 type: object
 *     responses:
 *       200:
 *         description: Complaint created
 */
router.post("/", auth, async (req, res) => {
    const complaint = repo().create({
        user_id: req.user.id,
        complaint_type: req.body.complaint_type,
        status: "raised",
        payload: req.body.payload,
        status_updated_at: new Date(),
    });

    await repo().save(complaint);
    res.json(complaint);
});


/**
 * @swagger
 * /complaints/{id}/status:
 *   patch:
 *     summary: Update complaint status
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch("/:id/status", auth, async (req, res) => {
    const { status } = req.body;

    const complaint = await repo().findOneBy({
        id: Number(req.params.id),
    });

    // Guard: complaint must exist
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    // Validate transition
    if (!isValidTransition(complaint.status, status)) {
        return res.status(400).json({ message: "Invalid status transition" });
    }

    // Update DB first (source of truth)
    complaint.status = status;
    complaint.status_updated_at = new Date();
    await repo().save(complaint);

    // Trigger notification AFTER successful update
    if (status === "in_progress" || status === "resolved") {
        await sendNotification(
            complaint.user_id,
            "Complaint Status Update",
            `Your complaint is now ${status}`
        );
    }

    res.json(complaint);
});



/**
 * @swagger
 * /complaints/{id}/metrics:
 *   get:
 *     summary: Get complaint time metrics
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Complaint metrics
 */
router.get("/:id/metrics", auth, async (req, res) => {
    const c = await repo().findOneBy({ id: Number(req.params.id) });
    const now = Date.now();

    res.json({
        complaint_id: c.id,
        current_status: c.status,
        time_in_current_status_minutes: Number(
            ((now - c.status_updated_at.getTime()) / 60000).toFixed(2)
        ),
        total_time_minutes: Number(
            ((now - c.created_at.getTime()) / 60000).toFixed(2)
        ),
    });
});

module.exports = router;
