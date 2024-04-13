import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
export default function Login() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <p>Login</p>
            </IonContent>
        </IonPage>
    );
}