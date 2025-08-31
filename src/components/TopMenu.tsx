'use client';

import Link from 'next/link';
import { IoWallet, IoSwapHorizontal, IoPerson } from 'react-icons/io5';

export const TopMenu = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <IoWallet className="text-white text-xl" />
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-blue-600">Mily</span>
                <span className="text-2xl font-light text-slate-700"> | Bank</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" 
              href="/"
            >
              <IoWallet className="text-lg" />
              <span className="font-medium">Mis Productos</span>
            </Link>
            <Link 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" 
              href="/transaccion"
            >
              <IoSwapHorizontal className="text-lg" />
              <span className="font-medium">Transferencias</span>
            </Link>
          </div>

          {/* Profile */}
          <div className="flex items-center">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              <IoPerson className="text-lg" />
              <span className="hidden sm:block font-medium">Perfil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-slate-200 bg-slate-50">
        <div className="flex">
          <Link 
            className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" 
            href="/"
          >
            <IoWallet className="text-lg" />
            <span className="text-sm font-medium">Productos</span>
          </Link>
          <Link 
            className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" 
            href="/transaccion"
          >
            <IoSwapHorizontal className="text-lg" />
            <span className="text-sm font-medium">Transferir</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};