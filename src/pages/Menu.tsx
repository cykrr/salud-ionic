import Semicircle from '../components/Semicircle';
import NavBar from '../components/NavBar';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';
import GraphMenu from '../components/GraphMenu';

export default function Menu() {
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
                                    <Semicircle value={100}/>
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