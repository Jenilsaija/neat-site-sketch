
// In a real application, use a library like bcrypt
// This is a simplified version for demonstration

export const hashPassword = async (password: string): Promise<string> => {
  // In a real app, use bcrypt.hash
  return `hashed_${password}`;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  // In a real app, use bcrypt.compare
  return hashedPassword === `hashed_${password}`;
};
