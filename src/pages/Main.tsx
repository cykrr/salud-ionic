import { Redirect } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonContent,
} from '@ionic/react';
import { useContext, useState } from 'react';
import Login from './Login';

import { UserContext } from '../App';

export default function Main() {
    const { userData, setUserData } = useContext(UserContext)!;
    const [component, setComponent] = useState(<Login />);

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                {userData.idUsuario ? <Redirect to ="/tabs" /> : <Redirect to="/login" />}
            </IonContent>
        </IonPage>
    );
}