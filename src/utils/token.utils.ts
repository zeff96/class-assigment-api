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
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function (error, decoded) {
      if (error || !decoded) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
}

export { encode, decode };
