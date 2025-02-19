import express from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controller/project.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllProjects);
router.get("/:id", verifyUser, getProject);
router.post("/:userid", verifyUser, createProject);
router.put("/:id", verifyUser, updateProject);
router.delete("/:id/:userid", verifyUser, deleteProject);

export default router;