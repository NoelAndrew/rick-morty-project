'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Navbar from "./components/molecules/Navigation";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <>
        <Navbar />
        <main className="animate-fadeIn">{children}</main>
        <footer className="flex items-center justify-between bg-gray-800 text-sm text-gray-500 py-4 px-4">
          <div className="flex justify-center items-center">
            <span>Noel Andrew - Portfolio</span>
          </div>
        </footer>
      </>
    </Provider>
  );
};

export default Layout;
