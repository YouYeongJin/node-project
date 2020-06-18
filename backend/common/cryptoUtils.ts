import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "a1s2d3f4g5h6j7k8".repeat(2); // 32byte
const IV_LENGTH = 16; // 무조건 16

export default {
    SHA512Encrypt: (password: string) => {
        return crypto.createHash("sha512").update(password).digest("hex");
    },

    AES256Encrypt: (data: string, key: string) => {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
        const encrypted = cipher.update(data);

        return iv.toString("hex") + ":" + Buffer.concat([encrypted, cipher.final()]).toString("hex");
    },

    AES256Decrypt: (data: string, key: string) => {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
        const encrypted = cipher.update(data);

        return iv.toString("hex") + ":" + Buffer.concat([encrypted, cipher.final()]).toString("hex");
    },

    RSA256Encrypt: (data: string, key: string) => {
        return " ";
    },

    RSA256Decrypt: (data: string, key: string) => {
        return " ";
    },
};
