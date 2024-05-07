import { NavBar, LinkButton } from '../components';
import { IonContent, IonPage, IonAlert} from '@ionic/react';
import { useEffect, useState } from 'react';

interface ExerciseItem {
    nombre: string;
    calorias: number;
    minutos: number;
}

interface ExerciseData {
    ejercicios: ExerciseItem[];
    totalCalorias: number;
    totalMinutos: number;
    minutosRecomendados: number;
}

export default function Exercise() {
    const URL = "http://localhost:5000/user/exercise?id=1"
    const [data, setData] = useState<ExerciseData>();
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
                        <h1>Tus ejercicios diarios</h1>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="bh-blue-100 text-left p-2">Ejercicio</th>
                                    <th className="bh-blue-100 text-left p-2">Minutos</th>
                                    <th className="bh-blue-100 text-left p-2">Calorías</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && (
                                    <>
                                        {data['ejercicios'].map((item, index) => (
                                            <tr key={index}>
                                                <td className="border p-2">{item['nombre']}</td>
                                                <td className="border p-2">{item['minutos']}</td>
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
                                    <p>Actividad física recomendada: {data.minutosRecomendados} min/día.</p>
                                    {(() => {
                                        const diff = data.totalMinutos - data.minutosRecomendados;
                                        if (diff >= 0) {
                                            return <p className="italic">¡Has cumplido con la actividad física recomendada!</p>;
                                        } else {
                                            return <p className="italic">Aún te faltan {Math.abs(diff)} minutos para alcanzar la actividad física recomendada.</p>;
                                        }
                                    })()}
                                </>
                            )}
                        </div>
                        <LinkButton className="self-center" href="/exercise_add">Añadir ejercicio</LinkButton>
                    </div>
                </div>
            </IonContent>

        </IonPage>

    )

}