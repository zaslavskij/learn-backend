import * as bcrypt from 'bcrypt';

const salt = 10;

export async function encodePassword(password: string): Promise<string> {
  return bcrypt.hash(password, salt);
}

export async function checkPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}
