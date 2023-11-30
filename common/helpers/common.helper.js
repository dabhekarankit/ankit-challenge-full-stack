import { createCipheriv, createDecipheriv } from "crypto";

/**
 * encrypt string
 * @param textToEncrypt
 * @returns
 */
export const encrypt = async (textToEncrypt) => {
    const AES_ENC_KEY_BUFFER = Buffer.from(process.env.AES_ENC_KEY, "hex");
    const AES_IV_BUFFER = Buffer.from(process.env.AES_IV, "hex");

    const cipher = createCipheriv("aes-256-cbc", AES_ENC_KEY_BUFFER, AES_IV_BUFFER);
    let encrypted = cipher.update(textToEncrypt, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
};

/**
 * decrypt string
 * @param encryptToText
 * @returns
 */
export const decrypt = async (encryptToText) => {
    const AES_ENC_KEY_BUFFER = Buffer.from(process.env.AES_ENC_KEY, "hex");
    const AES_IV_BUFFER = Buffer.from(process.env.AES_IV, "hex");

    const decipher = createDecipheriv("aes-256-cbc", AES_ENC_KEY_BUFFER, AES_IV_BUFFER);
    const decrypted = decipher.update(encryptToText, "base64", "utf8");
    return decrypted + decipher.final("utf8");
};
