import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controller/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);
router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyAdmin, deleteUser);

export default router;