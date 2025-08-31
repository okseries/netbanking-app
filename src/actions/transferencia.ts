import axios from "axios";

export interface DetalleCuentaOrigen {
  id: number;
  idCliente: number;
  referencia: number;
  tipo: number;
  estado: boolean;
  nombrePropietario: string;
  identificacionPropietario: string;
}

export interface CreateTransferencia {
  origenId: number;
  destinoId: number;
  monto: number;
  comentario?: string;
}

export const obtenerDetalleCuentaByReferencia = async (referencia: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5177/api/cuenta/referencia/${referencia}`
    );
    return data;
  } catch (error) {
    console.error('Error al obtener cuenta por referencia:', error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null; // Cuenta no encontrada
    }
    throw error; // Re-lanzar otros errores
  }
};

export const realizarTransferencia = async (datos: CreateTransferencia) => {
  try {
    console.log('Datos a enviar:', datos);
    const { data } = await axios.post(`http://localhost:5177/api/transferencia`, datos, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return data;
  } catch (error) {
    console.error('Error en realizarTransferencia:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
    }
    throw error;
  }
};
