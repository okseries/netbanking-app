"use client";

import { obtenerProductos, Producto } from "@/actions/productos";
import {
  DetalleCuentaOrigen,
  obtenerDetalleCuentaByReferencia,
  realizarTransferencia,
} from "@/actions/transferencia";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSend, IoCheckmarkCircle } from "react-icons/io5";

export default function NamePage() {
  const [origen, setorigen] = useState<number>();
  const [destino, setDestino] = useState<string>("");
  const [monto, setMonto] = useState<number | "">("");
  const [comentario, setComentario] = useState<string>("");

  const [puedeContinuar, setPuedeContinuar] = useState<boolean>(false);
  const [detalleCuenta, setDetalleCuenta] =
    useState<DetalleCuentaOrigen | null>(null);

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    ObtenerMisProductos();
  }, []);

  const ObtenerMisProductos = async () => {
    const productos = await obtenerProductos();
    setProductos(productos);
    return productos;
  };

  const validarOrigen = async () => {
    if (!destino) {
      alert("Por favor ingresa el número de referencia de la cuenta de destino");
      return;
    }
    
    try {
      const detalle = await obtenerDetalleCuentaByReferencia(destino);
      if (detalle) {
        setDetalleCuenta(detalle);
        setPuedeContinuar(true);
        console.log('Cuenta de destino encontrada:', detalle);
      } else {
        setDetalleCuenta(null);
        setPuedeContinuar(false);
        alert("No se encontró una cuenta con esa referencia");
      }
    } catch (error) {
      console.error('Error al validar cuenta:', error);
      setDetalleCuenta(null);
      setPuedeContinuar(false);
      alert("Error al validar la cuenta de destino");
    }
  };

  const handleSubmit = async () => {
    if (origen && destino && monto && detalleCuenta) {
      try {
        const datosTransferencia = {
          origenId: origen,
          destinoId: detalleCuenta.id, // Usar el ID de la cuenta encontrada, no la referencia
          monto: Number(monto),
          comentario: comentario || undefined,
        };
        
        console.log('Datos de transferencia:', datosTransferencia);
        
        const response = await realizarTransferencia(datosTransferencia);

        if (response) {
          resetForm();
          alert("Transferencia realizada con exito");
        }
      } catch (error) {
        console.error('Error al realizar transferencia:', error);
        alert("Error al realizar la transferencia. Revisa la consola para más detalles.");
      }
    } else {
      alert("Por favor completa todos los campos requeridos y verifica que la cuenta de destino existe");
    }
  };

  const resetForm = () => {
    setorigen(undefined);
    setDestino("");
    setMonto("");
    setComentario("");
    setDetalleCuenta(null);
    setPuedeContinuar(false);
  };

  const formatearMonto = (monto: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(monto);
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <IoSend className="text-2xl text-blue-600" />
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Nueva Transferencia</h1>
                <p className="text-slate-500">Envía dinero de forma segura entre cuentas</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Cuenta Origen */}
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Cuenta de Origen
                </label>
                <select
                  onChange={(e) => setorigen(Number(e.target.value))}
                  className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Selecciona tu cuenta</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.tipo === 0 ? 'Ahorros' : 'Corriente'} - {producto.referencia} ({formatearMonto(producto.balance)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Cuenta Destino */}
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Cuenta de Destino
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Número de referencia"
                    className="flex-1 p-3 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                  />
                  <button 
                    onClick={validarOrigen} 
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Verificar
                  </button>
                </div>
              </div>

              {/* Información de cuenta verificada */}
              {detalleCuenta && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <IoCheckmarkCircle className="text-lg text-green-600" />
                    <span className="text-sm font-medium text-green-800">Cuenta verificada</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    <span className="font-medium">{detalleCuenta.nombrePropietario}</span>
                    <span className="text-green-600 ml-2">
                      ({detalleCuenta.tipo === 0 ? "Ahorros" : "Corriente"})
                    </span>
                  </p>
                </div>
              )}

              {/* Monto y Comentario */}
              {puedeContinuar && origen && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Monto a Transferir
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={monto}
                      onChange={(e) => setMonto(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Comentario (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Descripción de la transferencia"
                      className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={resetForm}
                  className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!origen || !detalleCuenta || !monto}
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                  Transferir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
