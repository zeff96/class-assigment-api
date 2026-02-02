import jwt from "jsonwebtoken";

interface Payload {
  userId: string;
  username: string;
}

function encode(payload: Payload, secret: string) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { algorithm: "HS256" }, function (error, token) {
      if (error || !token) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

function decode(token: string, secret: string) {
  return jwt.verify(token, secret, { complete: true });
}

export { encode, decode };
