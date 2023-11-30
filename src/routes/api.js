import { Router } from "express";
import oAuthRoutes from "../oAuth/oAuth.routes";

const router = Router();

router.use("/oauth", oAuthRoutes);

export default router;
