import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import WebController from "./web.controller";

const router = Router();

router
    .get("/", expressAsyncHandler(WebController.getFrontPage))
    .get("/oauth2callback", expressAsyncHandler(WebController.oauth2callback))
    .get("/google-drive-risk-report", expressAsyncHandler(WebController.riskReport));

export default router;
