import {InputProp} from '../components/Input'
import Input from './Input';

function formatearRUT(rut: string) {
    rut = rut.replace(/[^\dkK]/g, ''); // Eliminar caracteres no válidos excepto d, k, K
    if (!rut) return rut;

    rut = rut.toLowerCase(); // Convertir 'K' en 'k' para manejar de manera uniforme

    var dv = rut.slice(-1); // Extraer el dígito verificador
    rut = rut.slice(0, -1); // Quitar el dígito verificador de la cadena

    // Formatear el RUT con puntos y separador de miles
    rut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return rut + '-' + dv; // Devolver el RUT formateado con el dígito verificador
}

export default function RutInput(args: InputProp) {
    return(
        <Input
            {...args}
            onChange={(e)=>{e.target.value = formatearRUT(e.target.value)}}
            maxLength={12}
        />
    )
}