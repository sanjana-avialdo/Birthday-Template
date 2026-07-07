import bcrypt from "bcryptjs";

export function hashPin(pin: string) {
  return bcrypt.hash(pin, 10);
}

export function verifyPin(pin: string, pinHash: string) {
  return bcrypt.compare(pin, pinHash);
}
