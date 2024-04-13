import Image from 'next/image';
import ImageCerrar from '../assets/cerrar.png'

export default function CloseButton() {
    return(
        <button className="w-6 h-6">
            <Image className="w-full h-full" src={ImageCerrar} alt=""/>
        </button>
    );
}