// import { useHistory } from 'react-router-dom';

interface BarItemProps {
    title: string;
    img: string;
    href: string;
}

import { IonRouterLink } from "@ionic/react";

export default function NavBar() {
    function BarItem({ title, img, href } : BarItemProps) {
        // let history = useHistory();
        return (
            <IonRouterLink routerLink={href}>
                <div 
                    className="flex flex-col w-full h-full \
                    text-center bg-[#97ffb5] cursor-pointer \
                    py-2 gap-2 text-black"
                    >
                    
                    <img src={img} alt="" className="object-contain w-full min-h-0"/>
                    {title}
                </div>
            </IonRouterLink>
        );
    }
    return (
        <div className="flex flex-row w-full h-24">
            <BarItem 
                href="/menu"
                title="Menú"
                img='src/assets/menu.png'/>
            <BarItem 
                href="/food"
                title="Alimentación"
                img="src/assets/alimentacion.png"/>
            <BarItem 
                href="/excercise"
                title="Ejercicios"
                img='src/assets/ejercicios.png'/>
        </div>
    );
}