import CryptoJS from "crypto-js";

export function encryptData(data: object, secretKey: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decryptData(
    cipherText: string,
    secretKey: string
): object | null {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        return null;
    }
}
