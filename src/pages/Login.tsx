import Input from '../components/Input';
import Button from '../components/Button';

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
            <div className="flex justify-center items-center h-full flex-col w-30">
        <div id="login" className="text-center w-32 h-full flex flex-col justify-center items-center">
          <label>Inicia Sesión</label>
          <div className="h-16"></div>
          <div className="px-10">
              <Input inputType={"text"} placeholder={"Usuario"}/>
              <Input inputType={"password"} placeholder={"Contraseña"}/>

              <div className="h-16"></div>
              <div className="flex justify-center">
                <div className="w-full flex flex-col mx-20 gap-3">
                  <Button>Iniciar Sesión</Button>
                  <Button>Registrarse</Button>


                </div>  

              </div>

          </div>
         </div>
      </div>
            </IonContent>
        </IonPage>
    );
}