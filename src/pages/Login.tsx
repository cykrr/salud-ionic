import Input from '../components/Input';
import Button from '../components/Button';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';
export default function Login() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex justify-center items-center h-full flex-col w-30">
                    <div id="login" className="text-center  h-full flex flex-col justify-center items-center">
                        <h1 className="text-xl text-bold">Bienvenido</h1>
                        <div className="h-16"></div>
                            <form id="login">
                                <Input id="user" inputType={"text"} placeholder={"Usuario"} />
                                <Input id="password" inputType={"password"} placeholder={"Contraseña"} />
                            </form>
                            <div className="h-6"></div>
                            <div className="flex justify-center">
                                <div className="w-full flex flex-col mx-20 gap-3">
                                    <Button>Iniciar Sesión</Button>
                                    <IonRouterLink href="/signup">
                                        <Button>Registrarse</Button>
                                    </IonRouterLink>
                                </div>
                            </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}