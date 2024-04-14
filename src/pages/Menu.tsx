import Semicircle from '../components/Semicircle';
import NavBar from '../components/NavBar';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';

export default function Login() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex w-full h-full flex-col">
                    <div className="flex h-full flex-col p-20 gap-5">
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
                    <NavBar/>
                </div>
            </IonContent>
        </IonPage>
    );
}