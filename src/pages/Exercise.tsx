import { NavBar, LinkButton } from '../components';
import { IonContent, IonPage } from '@ionic/react';
export default function Exercise() {
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
                                <tr>
                                    <td className="border p-2">Abdominales</td>
                                    <td className="border p-2">10 min.</td>
                                    <td className="border p-2">60 cal.</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Correr</td>
                                    <td className="border p-2">20 min.</td>
                                    <td className="border p-2">45 cal.</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Pesas 5 kg.</td>
                                    <td className="border p-2">15 min.</td>
                                    <td className="border p-2">30 cal.</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Total: </td>
                                    <td className="p-2 text-green-500">45 min.</td>
                                    <td className="p-2 text-green-500">135 cal.</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex flex-col gap-3">
                            <p>Actividad fisica recomendada: 60 min.</p>
                            <p className="italic">¡Te faltan <span className="text-green-500">15 min.</span> para completar la meta!</p>
                        </div>
                        <LinkButton className="self-center" href="/exercise_add">Añadir ejercicio</LinkButton>
                    </div>
                </div>
            </IonContent>

        </IonPage>

    )

}