import { IonPage, IonContent } from '@ionic/react';


export default function AdminFood() {
    return (
        <IonPage>
            <IonContent>
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-col gap-5 p-10">
                        <h1>Ejercicios registrados</h1>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}