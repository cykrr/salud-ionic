import Semicircle from '../components/Semicircle';

import { IonContent, IonPage } from '@ionic/react';
import GraphMenu from '../components/GraphMenu';
import { useEffect, useState } from 'react';

export default function Menu() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:5000/user/health?id=1')
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
                    <div className="flex h-full flex-col p-20 gap-16 overflow-y-auto">
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