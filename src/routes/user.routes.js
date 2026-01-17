const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { AppDataSource } = require("../config/db");


/**
 * @swagger
 * /user/details:
 *   get:
 *     summary: Get logged-in user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 */
router.get("/details", auth, async (req, res) => {
  const userRepo = AppDataSource.getRepository("User");
  const complaintRepo = AppDataSource.getRepository("Complaint");

  const user = await userRepo.findOneBy({ id: req.user.id });
  const count = await complaintRepo.count({ where: { user_id: user.id } });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    onboarding_stage: user.onboarding_stage,
    complaints_count: count,
    onboarding_complete: user.onboarding_stage === 2,
  });
});

module.exports = router;
