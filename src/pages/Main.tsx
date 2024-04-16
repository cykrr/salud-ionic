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
export default function Main() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Main</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton routerLink="/login">Login</IonButton>
                <IonButton routerLink="/signup">Signup</IonButton>
                <IonButton routerLink="/terms_and_conditions">Terms and Conditions</IonButton>
                <IonButton routerLink="/tabs">Menu</IonButton>
                <IonButton routerLink="/food">Food</IonButton>
                <IonButton routerLink="/exercise">Exercise</IonButton>
                <IonButton routerLink="/add_food">Add Food</IonButton>
                <IonButton routerLink="/add_exercise">Add Exercise</IonButton>
                <IonButton routerLink="/create_food">Create Food</IonButton>
            </IonContent>
        </IonPage>
    );
}