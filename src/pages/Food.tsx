import { IonHeader, IonPage, IonContent, IonRouterOutlet } from "@ionic/react";
import {NavBar, LinkButton, Button} from "../components";
import AddFood from "./AddFood";
import { Route } from "react-router-dom";

export default function Food() {
    return (
        <IonPage>
            <IonContent>
                <div className="flex flex-col w-full h-full">
                    <div className="p-5 overflow-y-auto">
                        <h1>Tu alimentación diaria</h1>
                        <div className='h-8'></div>
                            <div className="rounded-lg  space-y-2.5 p-5 ">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="bh-blue-100  text-left p-2">Alimento</th>
                                            <th className="bh-blue-100  text-left p-2">Cantidad</th>
                                            <th className="bh-blue-100  text-left p-2">Calorías</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border p-2">Arroz</td>
                                            <td className="border p-2">200 g.</td>
                                            <td className="border p-2">200 cal.</td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">Huevo</td>
                                            <td className="border p-2">2 un.</td>
                                            <td className="border p-2">155 cal.</td>
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
                                            <td className="border p-2">150 g.</td>
                                            <td className="border p-2">52 cal.</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Total: </td>
                                            <td className="text-red-500">569 cal.</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>Consumo recomendado 1200 cal.</p>
                                <p className="italic">No has alcanzado el consumo mínimo recomendado.</p>
                                <center>
                                    <LinkButton href="/tabs/food/add">Añadir alimento</LinkButton>
                                </center>
                            </div>
                    </div>
                </div>
            </IonContent>

        </IonPage>
    )
}