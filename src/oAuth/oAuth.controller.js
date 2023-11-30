import { OAuth2Client } from "google-auth-library";
import { decrypt } from "../../common/helpers/common.helper";
import { google } from "googleapis";
import OAuth from "./oAuth.model";
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

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

class OAuthController {
    // dashboard
    static async getAuthUrl(req, res) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
        });

        return res.json({
            url: authUrl,
            message: "Data save successfully.",
        });
    }

    // Remvove access
    static async revokeToken(req, res) {
        let token = JSON.parse(await decrypt(req.body.token));
        console.log(token);
        await OAuth.destroy({ where: { tokens: { access_token: token.access_token } } });
        await oAuth2Client.revokeToken(token.access_token);
        return res.json({ message: "Token revoked successfully." });
    }

    // Get drive data
    static async getData(req, res) {
        let tokens = JSON.parse(await decrypt(req.body.token));
        try {
            oAuth2Client.setCredentials(tokens);
        } catch (error) {
            let getData = await OAuth.findOne({
                where: { tokens: { access_token: tokens.access_token } },
            });
            oAuth2Client.setCredentials({
                refresh_token: getData.tokens.refresh_token,
            });

            tokens = await oAuth2Client.refreshAccessToken(getData.tokens);
        }

        const drive = google.drive({ version: "v3", auth: oAuth2Client });

        const userResponse = await drive.about.get({
            fields: "user,storageQuota",
        });
        const user = userResponse.data.user;

        const check = await OAuth.findOne({
            where: { tokens: { access_token: tokens.access_token } },
        });
        if (!check) {
            await OAuth.create({ tokens, emailAddress: user.emailAddress });
        }

        /** Get All files */
        let allFiles = [];
        let nextPageToken = null;
        do {
            let response = await drive.files.list({
                pageSize: 500,
                fields: "nextPageToken, files(id, name, mimeType, createdTime, modifiedTime, size, webViewLink, webContentLink, owners, lastModifyingUser, permissions)",
                includePermissionsForView: "published",
                q: "mimeType != 'application/vnd.google-apps.folder'", //and visibility = 'anyoneWithLink' //and visibility != 'limited'
                pageToken: nextPageToken,
            });

            const files = response.data.files;
            if (files.length) {
                allFiles = [...allFiles, ...files];
            }
            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);
        /** Get All files */

        /** Get anyone with the link files */
        let anyoneWithTheLinkfiles = allFiles.filter((file) => {
            const permissions = file.permissions || [];
            return permissions.some(
                (permission) => permission.id === "anyoneWithLink" || permission.type === "anyone"
            );
        });
        let anyoneWithTheLinkfileCounts = anyoneWithTheLinkfiles.length;
        /** Get anyone with the link files */

        /** Get owners files */
        const ownerFiles = allFiles.filter((file) => {
            const owners = file.owners || [];
            return owners.some((owner) => owner.me);
        });
        let ownerFileCounts = ownerFiles.length;
        /** Get owners files */

        /** Get shared externally files */
        const externallySharedFiles = ownerFiles.filter((file) => {
            const permissions = file.permissions || [];
            return permissions.some(
                (permission) =>
                    permission.type === "user" &&
                    permission.emailAddress !== user.emailAddress &&
                    permission.role != "owner"
            );
        });
        let externallySharedFileCounts = externallySharedFiles.length;
        /** Get shared externally files */

        /** Drive access */
        const driveAccess = [];
        ownerFiles.map((file) => {
            const permissions = file.permissions || [];
            permissions.map((permission) => {
                if (
                    permission.type === "user" &&
                    permission.emailAddress !== user.emailAddress &&
                    permission.role != "owner" &&
                    permission.kind == "drive#permission"
                ) {
                    let checkUser = driveAccess.find((row) => {
                        return row.emailAddress == permission.emailAddress;
                    });

                    if (!checkUser) {
                        driveAccess.push({
                            emailAddress: permission.emailAddress,
                            displayName: permission.displayName,
                            files: [file],
                        });
                    } else {
                        checkUser.files.push(file);
                    }
                }
            });
        });
        let driveAccessCount = driveAccess.length;
        /** Driver access */

        /**Calculate Risk */
        let sharedFielsCount = ownerFiles.filter((file) => {
            const permissions = file.permissions || [];
            return permissions.some(
                (permission) => permission.id === "anyoneWithLink" && permission.type === "anyone"
            );
        }).length;
        /**Calculate Risk */

        res.json({
            message:
                "Authentication successful. You can now use this connection for risk management.",
            data: {
                anyoneWithTheLinkfileCounts,
                anyoneWithTheLinkfiles,
                externallySharedFileCounts,
                externallySharedFiles,
                driveAccess,
                driveAccessCount,
                riskCount: parseInt((sharedFielsCount * 100) / ownerFileCounts),
                ownerFiles,
            },
        });
    }
}

export default OAuthController;
