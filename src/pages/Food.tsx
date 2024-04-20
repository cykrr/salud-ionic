import { IonHeader, IonPage, IonContent, IonRouterOutlet } from "@ionic/react";
import {NavBar, LinkButton, Button} from "../components";
import AddFood from "./AddFood";
import { Route } from "react-router-dom";

export default function Food() {
    return (
        <IonPage>
            <IonContent>
                <div className="flex flex-col w-full h-full p-20">
                    <div className="flex flex-col gap-5 overflow-y-auto">
                        <h1>Tu alimentación diaria</h1>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="bh-blue-100 text-left p-2">Alimento</th>
                                    <th className="bh-blue-100 text-left p-2">Cantidad</th>
                                    <th className="bh-blue-100 text-left p-2">Calorías</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Arroz</td>
                                    <td className="border p-2">200 g.</td>
                                    <td className="border p-2">200 cal.</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Jugo</td>
                                    <td className="border p-2">250 ml.</td>
                                    <td className="border p-2">170 cal.</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Pan integral</td>
                                    <td className="border p-2">60 g.</td>
                                    <td className="border p-2">140 cal.</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Lechuga</td>
                                    <td className="border p-2">150 g.</td>
                                    <td className="border p-2">22 cal.</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Manzana</td>
                                    <td className="border p-2">200 g.</td>
                                    <td className="border p-2">60 cal.</td>
                                </tr>
                                <tr>
                                    <td className="p-2"></td>
                                    <td className="p-2">Total: </td>
                                    <td className="p-2 text-red-500">592 cal.</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex flex-col gap-3">
                            <p>Consumo recomendado: 1200 cal.</p>
                            <p className="italic">No has alcanzado el consumo mínimo recomendado.</p>
                        </div>
                        <LinkButton className="self-center" href="/food_add">Añadir alimento</LinkButton>
                    </div>
                </div>
            </IonContent>

        </IonPage>
    )
}