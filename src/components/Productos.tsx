"use client";
import { obtenerProductos, Producto } from "@/actions/productos";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCard, IoEye, IoWallet, IoTrendingUp } from "react-icons/io5";
import { formatCurrency } from "../../utils/formatCurrency";

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ObtenerMisProductos();
  }, []);

  const ObtenerMisProductos = async () => {
    try {
      const productos = await obtenerProductos();
      setProductos(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

 

  const getTotalBalance = () => {
    return productos.reduce((total, producto) => total + producto.balance, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header con resumen */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <IoWallet className="text-lg text-blue-600" />
          <div>
            <h1 className="text-lg font-medium text-slate-800">Mis Productos</h1>
            <p className="text-sm text-slate-500">Gestiona tus cuentas bancarias</p>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center gap-1 mb-1">
            <IoTrendingUp className="text-sm text-slate-500" />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Balance Total</span>
          </div>
          <p className="text-2xl font-light text-slate-800">{formatCurrency(getTotalBalance())}</p>
          <p className="text-xs text-slate-500 mt-1">{productos.length} cuenta{productos.length !== 1 ? 's' : ''} activa{productos.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="space-y-3">
        {productos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-slate-200">
            <IoCard className="text-xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-slate-700 mb-1">No tienes productos bancarios</h3>
            <p className="text-xs text-slate-500">Contacta con tu banco para abrir una cuenta</p>
          </div>
        ) : (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IoCard className={`text-sm ${
                      producto.tipo === 0 ? 'text-green-600' : 'text-blue-600'
                    }`} />
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">
                        {producto.tipo === 0 ? 'Cuenta de Ahorros' : 'Cuenta Corriente'}
                      </h3>
                      <p className="text-xs text-slate-500">Ref: {producto.referencia}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-light text-slate-800">{formatCurrency(producto.balance)}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      producto.estado 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {producto.estado ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100">
                  <Link 
                    href={`/producto/${producto.id}`} 
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors"
                  >
                    <IoEye className="text-xs" />
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Productos;
