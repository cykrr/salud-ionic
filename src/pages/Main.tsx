import { Redirect, Route } from 'react-router-dom';
import {
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect } from 'react';
import MainTabRoot from './MainTabRoot';
import Login from './Login';

import { UserContext } from '../App';

export default function Main() {
    const { userData, setUserData } = React.useContext(UserContext);
    const [component, setComponent] = React.useState(<Login />);
    useEffect(() => {
        setComponent(userData.idUsuario ? <MainTabRoot /> : <Login />);
    }, [userData]);
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