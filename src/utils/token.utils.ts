import jwt from "jsonwebtoken";

interface Payload {
  userId: string;
  username: string;
}

function encode(payload: Payload, secret: string) {
  return jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: 60 * 15 });
}

function decode(token: string, secret: string) {
  return jwt.verify(token, secret, { complete: true });
}

export { encode, decode };
