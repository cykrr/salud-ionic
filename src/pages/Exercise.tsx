import { LinkButton } from '../components';
import { IonContent, IonPage, IonAlert} from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { API_URL, UserContext, logout, updateToken } from '../App';

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
    const {userData, setUserData} = useContext(UserContext)!;
    const [data, setData] = useState<ExerciseData>();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const URL = `${API_URL}/user/exercise?id=` + userData.idUsuario 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL, {
                    headers: {
                        'Authorization': `Bearer ${userData.token}`
                    }
                });

                if (response.status == 401) {
                    updateToken(setUserData, '');
                    return;
                }
                updateToken(setUserData, response.headers.get("Token")!)

                const jsonData = await response.json();
                if (!response.ok || (jsonData.hasOwnProperty('success') && !jsonData.success)) {
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
                    <div className="flex flex-col gap-5 p-10">
                        <div className="flex w-full flex-row justify-between">
                            <h1>Tus ejercicios diarios</h1>
                            <img className="w-8 h-8 cursor-pointer" src='src/assets/cerrar_sesion.png' onClick={() => {logout(setUserData)}} />
                        </div>
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