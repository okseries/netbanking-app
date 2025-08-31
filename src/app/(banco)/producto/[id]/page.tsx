"use client";

import { ProductoDetalle, detalleDeProducto } from '@/actions/productos';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoArrowBack, IoCard, IoTime, IoTrendingUp, IoTrendingDown } from 'react-icons/io5';
import { formatCurrency } from '../../../../../utils/formatCurrency';

interface Props {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: Props) {
  const [detalleProducto, setDetalleProducto] = useState<ProductoDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const initPage = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
      await obtenerDetalleProducto(resolvedParams.id);
      setLoading(false);
    };
    
    initPage();
  }, []);

  const obtenerDetalleProducto = async (productId: string) => {
    try {
      if (productId) {
        const detalle = await detalleDeProducto(Number(productId));
        setDetalleProducto(detalle);
      }
    } catch (error) {
      console.error('Error al obtener detalle del producto:', error);
    }
  };

  const formatearFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };





  const getTipoIcon = (tipo: number) => {
    return tipo === 0 ? <IoTrendingDown className="text-red-500 text-xs" /> : <IoTrendingUp className="text-green-500 text-xs" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-6 max-w-4xl">
        

        {/* Información del Producto */}
        {detalleProducto && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <IoCard className="text-lg text-blue-600" />
                <div>
                  <h1 className="text-lg font-medium text-slate-800">
                    {detalleProducto.tipo === 0 ? 'Cuenta de Ahorros' : 'Cuenta Corriente'}
                  </h1>
                  <p className="text-sm text-slate-500">Ref: {detalleProducto.referencia}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                detalleProducto.estado 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {detalleProducto.estado ? 'Activa' : 'Inactiva'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Saldo Disponible</p>
                  <p className="text-2xl font-light text-slate-800">{formatCurrency(detalleProducto.balance)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Propietario</p>
                  <p className="text-sm text-slate-700">{detalleProducto.propietario.nombre}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm text-slate-600">{detalleProducto.propietario.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Identificación</p>
                  <p className="text-sm text-slate-600">{detalleProducto.propietario.identificacion}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Movimientos */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IoTime className="text-sm text-slate-500" />
              <h2 className="text-sm font-medium text-slate-800">Movimientos Recientes</h2>
            </div>

            {detalleProducto?.movimientos.length === 0 ? (
              <div className="text-center py-12">
                <IoTime className="text-xl text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No hay movimientos registrados</p>
              </div>
            ) : (
              <div className="space-y-0">
                {detalleProducto?.movimientos.map((movimiento) => (
                  <div 
                    key={movimiento.id} 
                    className="flex items-center justify-between py-3 px-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {getTipoIcon(movimiento.tipo)}
                      </div>
                      <div>
                        <p className="text-sm text-slate-800">{movimiento.descripcion}</p>
                        <p className="text-xs text-slate-500">
                          {formatearFecha(movimiento.fecha)} • Ref: {movimiento.referencia}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        movimiento.tipo === 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {movimiento.tipo === 0 ? '-' : '+'}{formatCurrency(Math.abs(movimiento.monto))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

