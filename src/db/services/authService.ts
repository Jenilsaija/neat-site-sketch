
import { getUserByEmail, createUser } from '../queries/userQueries';
import { User } from '../models/types';
import { comparePassword, hashPassword } from '../../utils/passwordUtils';

export const loginUser = async (email: string, password: string): Promise<{ user: Omit<User, 'password'>, token: string } | null> => {
  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      return null;
    }
    
    const passwordMatch = await comparePassword(password, user.password || '');
    if (!passwordMatch) {
      return null;
    }

    // In a real application, generate a JWT token here
    const token = 'mock-jwt-token';
    
    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: Omit<User, 'password'>, token: string } | null> => {
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return null;
    }
    
    // Hash password before storing
    const hashedPassword = await hashPassword(password);
    
    // Create new user
    const userId = await createUser({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });
    
    if (!userId) {
      return null;
    }
    
    // In a real application, generate a JWT token here
    const token = 'mock-jwt-token';
    
    return {
      user: {
        id: userId,
        name,
        email,
        role: 'user'
      },
      token
    };
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
};
