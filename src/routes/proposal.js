import express from "express";
import { createProposal, deleteProposal, getAllProposals, getProposal, updateProposal } from "../controller/proposal.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllProposals);
router.get("/:id", verifyUser, getProposal);
router.post("/:projectid", verifyAdmin, createProposal);
router.put("/:id", verifyAdmin, updateProposal);
router.delete("/:id/:projectid", verifyAdmin, deleteProposal);

export default router;