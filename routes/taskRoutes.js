const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenctication");

const {
  createTask,
  getAllTasks,
  getUserTasks,
  getTask,
  repeatTask,
  cancelTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router
  .route("/")
  .post(authenticateUser, authorizePermissions("user", "founder"), createTask)
  .get([authenticateUser, authorizePermissions("founder")], getAllTasks);

router
  .route("/usertasks")
  .get(
    [authenticateUser, authorizePermissions("user", "founder")],
    getUserTasks
  );
router
  .route("/repeattask/:id")
  .patch(authenticateUser, authorizePermissions("user", "founder"), repeatTask);

router
  .route("/canceltask/:id")
  .patch(authenticateUser, authorizePermissions("user", "founder"), cancelTask);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("user", "founder"), getTask)
  .patch(authenticateUser, authorizePermissions("user", "founder"), updateTask)
  .delete(
    authenticateUser,
    authorizePermissions("user", "founder"),
    deleteTask
  );

module.exports = router;
