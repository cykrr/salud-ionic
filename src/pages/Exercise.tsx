import { NavBar, LinkButton } from '../components';
import { IonContent, IonPage } from '@ionic/react';
export default function Exercise() {
    return (
        <IonPage>
            <IonContent>
                <div className="flex flex-col w-full h-full">
                    <div className="grow m-5 overflow-y-auto">
                        <h1>Tus ejercicios diarios</h1>
                        <div className='h-8'></div>
                            <div className="rounded-lg  space-y-2.5 p-5 ">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="bh-blue-100  text-left p-2">Ejercicio</th>
                                            <th className="bh-blue-100  text-left p-2">Rep./Min.</th>
                                            <th className="bh-blue-100  text-left p-2">Calorías</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border p-2">Abdominales</td>
                                            <td className="border p-2">60 rep.</td>
                                            <td className="border p-2">60 cal.</td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">Correr</td>
                                            <td className="border p-2">20 min.</td>
                                            <td className="border p-2">45 cal.</td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">Pesas 5kg</td>
                                            <td className="border p-2">30 rep.</td>
                                            <td className="border p-2">30 cal.</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Total: </td>
                                            <td className="text-green-500">569 cal.</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>Consumo recomendado 1200 cal.</p>
                                <p className="italic">No has alcanzado el consumo mínimo recomendado.</p>
                                <div className="h-4"></div>
                                <center>
                                    <LinkButton href="/add_exercise">Añadir ejercicio</LinkButton>
                                </center>
                            </div>
                    </div>
                    <NavBar></NavBar>
                </div>
            </IonContent>

        </IonPage>

    )

}