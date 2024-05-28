import Semicircle from '../components/Semicircle';

import { IonContent, IonPage } from '@ionic/react';
import GraphMenu from '../components/GraphMenu';
import { useContext, useEffect, useState } from 'react';
import { API_URL, UserContext } from '../App';

export default function Menu() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [score, setScore] = useState(0);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/user/health?id=` + userData.idUsuario)
            const data = await response.json();

            if (response.ok) {
                setScore(data.score)
            }
        })()
    }, []);

    return (
        <IonPage>
            <IonContent>
                <div className="flex w-full h-full flex-col">
                    <div className="flex h-full flex-col p-10 gap-12 overflow-y-auto">
                        <div className="flex flex-col gap-5">
                            <h1>¡Bienvenido Usuario!</h1>
                            <div className="flex w-full flex-col gap-5">
                                <div>
                                    <h2>Tu salud</h2>
                                    <hr/>
                                </div>
                                <div className="flex justify-center">
                                    <Semicircle value={score}/>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-xl w-full self-center">
                            <GraphMenu/>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}