import { Router } from "express";
import OAuthController from "./oAuth.controller";
import expressAsyncHandler from "express-async-handler";
import validator from "../../common/helpers/validator.helper";
import getAuthUrlDto from "./dtos/get-auth-url.dto";

const router = Router();

router
    .post(
        "/get-auth-url",
        validator.body(getAuthUrlDto),
        expressAsyncHandler(OAuthController.getAuthUrl)
    )
    .post("/revoke-token", expressAsyncHandler(OAuthController.revokeToken))
    .post("/get-data", expressAsyncHandler(OAuthController.getData));

export default router;
