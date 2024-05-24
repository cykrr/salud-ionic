import { IonPage, IonContent, IonAlert } from "@ionic/react";
import { LinkButton } from "../components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

interface FoodItem {
    nombre: string;
    calorias: number;
    cantidad: number;
    unidad: string;
}

interface FoodData {
    alimentos: FoodItem[];
    totalCalorias: number;
    recomendado: number;
    margen: number;
}

export default function Food() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [data, setData] = useState<FoodData>();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const URL = "http://localhost:5000/user/food?id=" + userData.idUsuario

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
                setData(undefined);
                setShowAlert(true);
                setAlertMessage("¡No pudimos cargar tus datos! Por favor inténtalo más tarde.")
            }
        };
    
        fetchData();
    }, []);
    
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
                                        {data['alimentos'].map((item, index) => (
                                            <tr key={index}>
                                                <td className="border p-2">{item['nombre']}</td>
                                                <td className="border p-2">{item['cantidad'] + " " + item['unidad']}</td>
                                                <td className="border p-2">{item['calorias']} cal.</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="p-2"></td>
                                            <td className="p-2">Total: </td>
                                            <td className="p-2 text-red-500">{data['totalCalorias']} cal.</td>
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
                            {data && (
                                <>
                                    <p>Consumo recomendado: {data.recomendado - data.margen} - {data.recomendado + data.margen} cal.</p>
                                    {(() => {
                                        const diff = data.totalCalorias - data.recomendado;
                                        if (diff > data.margen) {
                                            return <p className="italic">Has superado el consumo mínimo recomendado en {diff - data.margen} cal.</p>;
                                        } else if (diff < -data.margen) {
                                            return <p className="italic">Te faltan {Math.abs(diff) - data.margen} cal. para alcanzar el consumo mínimo recomendado</p>;
                                        } else {
                                            return <p className="italic">Has alcanzado el consumo mínimo recomendado.</p>;
                                        }
                                    })()}
                                </>
                            )}
                        </div>
                        <LinkButton className="self-center" href="/food_add">Añadir alimento</LinkButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}