import bcrypt from "bcrypt";

async function hashPassword(plainPassword: string) {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
}

async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export { hashPassword, verifyPassword };
