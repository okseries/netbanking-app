import axios from "axios";
import { obtenerClienteSeleccionado } from "./clientes";

export interface Producto {
    id:         number;
    idCliente:  number;
    referencia: number;
    balance:    number;
    tipo:       number;
    estado:     boolean;
    cliente:    null;
}



export interface ProductoDetalle {
    id:               number;
    idCliente:        number;
    referencia:       number;
    balance:          number;
    tipo:             number;
    estado:           boolean;
    fechaCreacion:    Date;
    propietario:      Propietario;
    movimientos:      Movimiento[];
    totalMovimientos: number;
    totalCreditos:    number;
    totalDebitos:     number;
}

export interface Movimiento {
    id:          number;
    cuentaId:    number;
    fecha:       Date;
    monto:       number;
    tipo:        number;
    referencia:  string;
    descripcion: string;
    cuenta:      null;
}

export interface Propietario {
    id:             number;
    nombre:         string;
    identificacion: string;
    email:          string;
}



export const obtenerProductos = async () => {
    const clienteSeleccionado = obtenerClienteSeleccionado();
    
    if (!clienteSeleccionado) {
        throw new Error('No hay cliente seleccionado');
    }

    const {data} = await axios.get<Producto[]>(`http://localhost:5177/api/cuenta/cliente/${clienteSeleccionado.id}`);

    return data;
};


export const detalleDeProducto = async (productoId: number) => {
    try {
        const { data } = await axios.get<ProductoDetalle>(`http://localhost:5177/api/cuenta/${productoId}/detalle`);
        return data;
    } catch (error) {
        console.error('Error al obtener detalle de producto:', error);
        throw error;
    }
};
