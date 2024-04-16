import { NavBar } from "../components";
import MainTabs from "./MainTabs";

import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { triangle, ellipse, square } from 'ionicons/icons';

import { Menu, Food, Exercise } from '.'

import './MainTabRoot.css'

export default function MainTabRoot() {
    return (
<IonTabs>
    <IonRouterOutlet>
      <Redirect exact path="/tabs" to="/tabs/menu"/>
      <Route exact path="/tabs">
        <Redirect to="/tabs/menu" />
      </Route>
      <Route exact path="/tabs/menu">
        <Menu/>
      </Route>
      <Route exact path="/tabs/food">
        <Food/>
      </Route>
      <Route path="/tabs/exercise">
        <Exercise/>
      </Route>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/tabs/menu">
        <img src="src/assets/menu.png"/>
        <IonLabel>Menú</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/tabs/food">
        <img src='src/assets/alimentacion.png'/>
        <IonLabel>Alimento</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tabs/exercise">
        <img src='src/assets/ejercicios.png'/>
        <IonLabel>Ejercicio</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
    )
}