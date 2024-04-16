import { useState } from 'react';
import graphFood from '../assets/grafico_alimentacion.png'
import graphExercises from '../assets/grafico_ejercicios.png'

export default function MenuBar() {
    const IdBarFood = "barAlimentacion";
    const IdBarExercises = "barEjercicios";
    const [selectedItem, setSelectedItem] = useState<string>(IdBarFood);

    function BarItem({ id, barTitle } : { id: string, barTitle: string }) {
        return (
            <div className="w-full">
                <div 
                    onClick={() => setSelectedItem(id)}
                    className={`w-full p-4 text-center bg-gray-100 ${selectedItem === id ? 'selected' : ''} text-lg cursor-pointer`}
                >
                    {barTitle}
                </div>

                <style> {`
                    .selected {
                        border-bottom: 2px solid #00E0FF;
                        color: #00779C;
                    }
                `}
                </style>
            </div>
        );
    }

    function getTitle() {
        if(selectedItem == IdBarFood) {
            return "Consumo semanal de calorías";
        } else {
            return "Calorías quemadas";
        }
    }

    function getImage() {
        if(selectedItem == IdBarFood) {
            return graphFood;
        } else {
            return graphExercises;
        }    
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex flex-row w-full">
                <BarItem id={IdBarFood} barTitle="Alimentación"/>
                <BarItem id={IdBarExercises} barTitle="Ejercicios"/>
            </div>
            <div className="flex flex-col w-full gap-5">
                <div className="flex flex-col w-full">
                    <div className="text-xl">{getTitle()}</div>
                    <hr/>
                </div>
                <img src={getImage()}/>
            </div>
        </div>
    );
}