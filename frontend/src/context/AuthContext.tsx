import { createContext, useContext, useState, type ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
  role: string;
  provider: string;
}

interface AuthContextType {
  user: User | null;       
  isLoading: boolean;     
  login: (userData: User) => void; 
  logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Đọc dữ liệu từ localStorage ngay lúc khởi tạo State (Lazy initialization)
  // Cách này tối ưu hiệu suất hơn và tránh lỗi gọi setState trong useEffect
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('dreamscribe_user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Lỗi đọc dữ liệu user:", error);
        return null;
      }
    }
    return null;
  });
  
  const [isLoading] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('dreamscribe_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dreamscribe_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Tắt cảnh báo Fast Refresh của Vite cho đoạn này
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};