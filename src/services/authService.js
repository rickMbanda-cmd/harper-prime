
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://0.0.0.0:5000/api';

class AuthService {
  // Register user
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const data = await response.json();
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  // Make authenticated request
  async makeAuthenticatedRequest(url, options = {}) {
    const token = this.getToken();
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      
      if (response.status === 401) {
        // Token expired or invalid
        this.logout();
        window.location.href = '/auth';
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
