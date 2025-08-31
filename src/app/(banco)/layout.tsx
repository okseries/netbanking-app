"use client";

import { useState, useEffect } from 'react';
import { TopMenu } from "@/components/TopMenu";
import SeleccionCliente from "@/components/SeleccionCliente";
import { Cliente, obtenerClienteSeleccionado } from '@/actions/clientes';

interface Props {
  children: React.ReactNode;
}

const ShopLayout = ({ children }: Props) => {
  const [clienteActual, setClienteActual] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cliente = obtenerClienteSeleccionado();
    setClienteActual(cliente);
    setLoading(false);
  }, []);

  const manejarClienteSeleccionado = (cliente: Cliente) => {
    setClienteActual(cliente);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!clienteActual) {
    return <SeleccionCliente onClienteSeleccionado={manejarClienteSeleccionado} />;
  }

  return (
    <main className="min-h-screen">
      <TopMenu clienteActual={clienteActual} />
      <div className="mx-0 md:mx-10">{children}</div>
    </main>
  );
};

export default ShopLayout;