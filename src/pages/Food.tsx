import { IonHeader, IonPage, IonContent, IonRouterOutlet, IonAlert } from "@ionic/react";
import {NavBar, LinkButton, Button} from "../components";
import AddFood from "./AddFood";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Food() {
    const URL = "http://localhost:5000/user/food/consumption?id=1"
    const [data, setData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                const jsonData = await response.json();

                if (!response.ok || (jsonData.hasOwnProperty('success') && !jsonData.success)) {
                    if (jsonData.hasOwnProperty('success') && !jsonData.success) {
                        console.log(jsonData['message']);
                    }
                    throw Error();
                }

                setData(jsonData)
            } catch(e) {
                setData([]);
                setShowAlert(true);
                setAlertMessage("¡No pudimos cargar tus datos! Por favor inténtalo más tarde.")
            }
        };
    
        fetchData();
    }, []);

    function calcularTotal(data: any[]) {
        var suma = 0
        data.map((item: any) => {
            suma += item['calorias']
        })
        return suma;
    }
    
    return (
        <IonPage>
            <IonContent>
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-col gap-5 p-20">
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
                                {data && (
                                    <>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td className="border p-2">{item['nombre']}</td>
                                                <td className="border p-2">{item['cantidad'] + " " + item['unidad']}</td>
                                                <td className="border p-2">{item['calorias']} cal.</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="p-2"></td>
                                            <td className="p-2">Total: </td>
                                            <td className="p-2 text-red-500">{calcularTotal(data) + " cal."}</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <IonAlert
                            isOpen={showAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header={'Error'}
                            message={alertMessage}
                            buttons={['OK']}
                        />
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