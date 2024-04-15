import Semicircle from '../components/Semicircle';
import NavBar from '../components/NavBar';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';

export default function Menu() {
    return (
        <IonPage>
            <IonContent>
                <div className="flex flex-col  \
                                w-full h-full">
                    <div className='grow m-5 overflow-scroll'>
                        <h1>Menú Principal</h1>
                        <div className="flex grow flex-col">
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
                        </div>

                    </div>

                    <NavBar/>
                </div>
            </IonContent>
        </IonPage>
    );
}