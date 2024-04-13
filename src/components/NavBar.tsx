import { StaticImageData } from 'next/image';
import Image from 'next/image';

import ImageMenu from '../assets/menu.png'
import ImageAlimentacion from '../assets/alimentacion.png'
import ImageEjercicios from '../assets/ejercicios.png'

export default function NavBar() {
    function BarItem({ title, img } : { title: string; img: StaticImageData }) {
        return (
            <div className="flex flex-col w-full h-full text-center bg-[#97ffb5] cursor-pointer py-2 gap-2">
                <Image src={img} alt="" className="object-contain w-full min-h-0"/>
                {title}
            </div>
        );
    }

    return (
        <div className="flex flex-row w-full h-24">
            <BarItem title="Menú" img={ImageMenu}></BarItem>
            <BarItem title="Alimentación" img={ImageAlimentacion}></BarItem>
            <BarItem title="Ejercicios" img={ImageEjercicios}></BarItem>
        </div>
    );
}