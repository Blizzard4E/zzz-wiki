import CryptoJS from "crypto-js";

const secretKey = "your-secret-key";

export function encryptData(data: object): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decryptData(cipherText: string): object | null {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        return null;
    }
}
