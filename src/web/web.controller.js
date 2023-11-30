import { OAuth2Client } from "google-auth-library";
import { encrypt } from "../../common/helpers/common.helper";

const credentials = {
    client_id: process.env.O_AUTH_CLIENT_ID,
    client_secret: process.env.O_AUTH_CLIENT_SECRET,
    redirect_uris: [process.env.O_AUTH_REDIRECT_URL],
};

const oAuth2Client = new OAuth2Client(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[0]
);

const SCOPES = ["https://www.googleapis.com/auth/drive"];

class WebController {
    /** Get Front Page */
    static async getFrontPage(req, res) {
        return res.render("index");
    }

    /** Redirection url */
    static async oauth2callback(req, res) {
        const code = req.query.code;
        try {
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);

            let encryptData = await encrypt(JSON.stringify(tokens));
            return res.render("oauth", {
                encryptData,
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Error retrieving access token.");
        }
    }

    static async riskReport(req, res) {
        return res.render("google-drive-risk-report");
    }
}

export default WebController;
