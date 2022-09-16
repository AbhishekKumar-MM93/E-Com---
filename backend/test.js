import aes256 from "aes256";

let key = "rahul bhai 001";
let plaintextSK = "ashu bhai 002";
let plaintextPK = "abhishek 003";

let buffer = Buffer.from(plaintextSK);

var encryptedPlainTextSK = aes256.encrypt(key, plaintextSK);
console.log(encryptedPlainTextSK);

var decryptedPlainTextSK = aes256.decrypt(key, encryptedPlainTextSK);
console.log(decryptedPlainTextSK);

// -----------------
let buffer02 = Buffer.from(plaintextPK);

var encryptedPlainTextPK = aes256.encrypt(key, plaintextPK);
console.log(encryptedPlainTextPK);

var decryptedPlainTextPK = aes256.decrypt(key, encryptedPlainTextPK);
console.log(decryptedPlainTextPK);
// var encryptedBuffer = aes256.encrypt(key, buffer);
// console.log(encryptedBuffer);
// var decryptedBuffer = aes256.decrypt(key, encryptedBuffer);
// console.log(decryptedBuffer);
