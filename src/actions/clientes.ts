
import axios from "axios";

export interface Cliente {
    id: number;
    nombre: string;
    identificacion: string;
    email: string;
}

export const obtenerClientes = async (): Promise<Cliente[]> => {
    try {
        const { data } = await axios.get<Cliente[]>(`http://localhost:5177/api/cliente`);
        return data;
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw error;
    }
};

// Funciones para manejar el cliente en localStorage
export const guardarClienteSeleccionado = (cliente: Cliente): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('clienteSeleccionado', JSON.stringify(cliente));
    }
};

export const obtenerClienteSeleccionado = (): Cliente | null => {
    if (typeof window !== 'undefined') {
        const clienteStr = localStorage.getItem('clienteSeleccionado');
        return clienteStr ? JSON.parse(clienteStr) : null;
    }
    return null;
};

export const limpiarClienteSeleccionado = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('clienteSeleccionado');
    }
};