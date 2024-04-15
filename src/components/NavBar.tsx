export default function NavBar() {
    function BarItem({ title, img } : { title: string; img: string }) {
        return (
            <div className="flex flex-col w-full h-full text-center bg-[rgb(151,255,181)] cursor-pointer py-2 gap-2">
                <img src={img} alt="" className="object-contain w-full min-h-0"/>
                {title}
            </div>
        );
    }
    return (
        <div className="flex flex-row w-full h-24">
            <BarItem title="Menú" img={'src/assets/menu.png'}></BarItem>
            <BarItem title="Alimentación" img={'src/assets/alimentacion.png'}></BarItem>
            <BarItem title="Ejercicios" img={'src/assets/ejercicios.png'}></BarItem>
        </div>
    );
}