import * as bcrypt from 'bcrypt';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
