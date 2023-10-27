import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from './components/User/DateUser';
import { fakeData1, fakeDataAdmin } from './components/Home/Slide/fakeData';
import { useNavigate } from 'react-router-dom';


// Định nghĩa kiểu dữ liệu cho một item trong SearchResultItem
export interface SearchResultItem {
  id: number;
  label: string;
  name: string;
  rating: number;
  imageSrc: string;
}

// Định nghĩa kiểu dữ liệu cho ContextValue
interface DataContextValue {
  data: SearchResultItem[];
  checkUserOrAdmin: string;
  checkSearch: string;
  setData: React.Dispatch<React.SetStateAction<SearchResultItem[]>>;
  setcheckUserOrAdmin: React.Dispatch<React.SetStateAction<string>>;
  setcheckSearch: React.Dispatch<React.SetStateAction<string>>;
}

// Tạo Context
const DataContext = createContext<DataContextValue | undefined>(undefined);

// Hook để sử dụng DataContext trong các thành phần khác
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}


// Provider cho Context
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SearchResultItem[]>([]);
  const [checkUserOrAdmin, setcheckUserOrAdmin] = useState('user');
  const [checkSearch, setcheckSearch] = useState('home_page');
  const nav = useNavigate()
  const contextValue: DataContextValue = {
    data,
    checkUserOrAdmin,
    checkSearch,
    setData,
    setcheckUserOrAdmin,
    setcheckSearch,


  };
  useEffect(() => {
    const usersString = localStorage.getItem('user');
    // const user: User = JSON.parse(usersString || '');
    const user: User | null = usersString ? JSON.parse(usersString) : null;
    if (user) {
      setcheckUserOrAdmin(user.isAdmin ? 'admin' : 'user')
      setData(user.isAdmin ? fakeDataAdmin.items : fakeData1.items)
    }
  }, [])



  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
