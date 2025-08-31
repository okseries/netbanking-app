"use client";

import { useState, useEffect } from 'react';
import { Cliente, obtenerClientes, guardarClienteSeleccionado } from '@/actions/clientes';
import { IoPersonCircle, IoLogIn } from 'react-icons/io5';

interface Props {
  onClienteSeleccionado: (cliente: Cliente) => void;
}

export default function SeleccionCliente({ onClienteSeleccionado }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const clientesData = await obtenerClientes();
      setClientes(clientesData);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const manejarSeleccion = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
  };

  const confirmarSeleccion = () => {
    if (clienteSeleccionado) {
      guardarClienteSeleccionado(clienteSeleccionado);
      onClienteSeleccionado(clienteSeleccionado);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <IoPersonCircle className="text-2xl text-blue-600" />
          </div>
          <h1 className="text-lg font-medium text-slate-800 mb-1">Iniciar Sesión</h1>
          <p className="text-sm text-slate-500">Selecciona tu perfil para continuar</p>
        </div>

        <div className="space-y-2 mb-6">
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              onClick={() => manejarSeleccion(cliente)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                clienteSeleccionado?.id === cliente.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  clienteSeleccionado?.id === cliente.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  <IoPersonCircle className="text-lg" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{cliente.nombre}</p>
                  <p className="text-xs text-slate-500">{cliente.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={confirmarSeleccion}
          disabled={!clienteSeleccionado}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          <IoLogIn className="text-sm" />
          Iniciar como {clienteSeleccionado?.nombre}
        </button>

        {clientes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-slate-500">No se encontraron clientes disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}
