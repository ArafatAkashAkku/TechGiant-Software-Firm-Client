import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('adminToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear stored auth data
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');

      // Redirect to login page
      window.location.href = '/admin/login';
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

// API Service Interface
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    username: string;
    role: 'admin';
  };
  token?: string;
  message?: string;
}

interface ValidateTokenResponse {
  valid: boolean;
  user?: {
    id: string;
    username: string;
    role: 'admin';
  };
}

// Auth API Service
const authAPI = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // TODO: Uncomment when API is ready
    // const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    // return response.data;

    // Mock response - remove when API is ready
    return new Promise(resolve => {
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          resolve({
            success: true,
            user: {
              id: '1',
              username: 'admin',
              role: 'admin',
            },
            token: 'mock-jwt-token-' + Date.now(),
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid credentials',
          });
        }
      }, 1000); // Simulate API delay
    });
  },

  // Logout user
  logout: async (): Promise<void> => {
    // TODO: Uncomment when API is ready
    // await apiClient.post('/auth/logout');

    // Mock logout - remove when API is ready
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  // Validate token
  validateToken: async (): Promise<ValidateTokenResponse> => {
    // TODO: Uncomment when API is ready
    // const response = await apiClient.get<ValidateTokenResponse>('/auth/validate');
    // return response.data;

    // Mock validation - remove when API is ready
    return new Promise(resolve => {
      setTimeout(() => {
        const token = localStorage.getItem('adminToken');
        const user = localStorage.getItem('adminUser');

        if (token && user) {
          resolve({
            valid: true,
            user: JSON.parse(user),
          });
        } else {
          resolve({
            valid: false,
          });
        }
      }, 500);
    });
  },
};

interface User {
  id: string;
  username: string;
  role: 'admin';
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('adminUser');
        const storedToken = localStorage.getItem('adminToken');

        if (storedUser && storedToken) {
          // Validate token with API service
          const validation = await authAPI.validateToken();
          if (validation.valid && validation.user) {
            setUser(validation.user);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('adminUser');
            localStorage.removeItem('adminToken');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Use API service for login
      const response = await authAPI.login({ username, password });

      if (response.success && response.user && response.token) {
        // Store in localStorage
        localStorage.setItem('adminUser', JSON.stringify(response.user));
        localStorage.setItem('adminToken', response.token);

        setUser(response.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API service
      await authAPI.logout();

      // Clear local storage and state
      setUser(null);
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local data even if API call fails
      setUser(null);
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
    }
  };

  const validateToken = async (): Promise<boolean> => {
    try {
      // Use API service for token validation
      const validation = await authAPI.validateToken();
      return validation.valid;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const value: AuthContextProps = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    validateToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
