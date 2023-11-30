import { Router } from "express";
import apiRoutes from "./api";
import webRoutes from "../web/web.routes";

const router = Router();

router.use("/api/v1", apiRoutes).use("/", webRoutes);

export default router;
