// src/utils/cookieUtils.ts
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'This_isBigKeyForJeeniB2BForWebApp_Secret_Key'; // Use a secure and strong secret key

// Encrypt data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Set encrypted cookie with expiry and secure options
export const setEncryptedCookie = (
    name,
    value,
    options
) => {
    const encryptedValue = encryptData(value);
    Cookies.set(name, encryptedValue, {
        ...options,
        expires: options.expires || 7, // Default expiry set to 7 days if not provided
        secure: options.secure !== undefined ? options.secure : true, // Set to true by default for secure cookies
        sameSite: 'Strict', // Ensures cookies are sent only on the same site, can adjust as needed
    });
};

// Get encrypted cookie
export const getEncryptedCookie = (name) => {
  const encryptedValue = Cookies.get(name);
  return encryptedValue ? decryptData(encryptedValue) : null;
};

// Delete cookie
export const deleteCookie = (name) => {
  Cookies.remove(name);
};
