import { NavBar } from "../components";
import MainTabs from "./MainTabs";
import { AddFood, AddExercise, CreateFood } from "./";

import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonNav, TabsCustomEvent } from '@ionic/react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { triangle, ellipse, square } from 'ionicons/icons';

import { Menu, Food, Exercise } from '.'

import { useEffect, useRef, useState } from 'react'

import './MainTabRoot.css'
import FoodRouter from "./FoodRouter";

export default function MainTabRoot() {
    const [selected, setSelected] = useState('menu');
    const tabs = useRef<HTMLIonTabsElement>(null);

    function handleClick(e: CustomEvent<HTMLIonTabButtonElement>) {
        const selectedTab: string = e['detail']['tab']
        setSelected(selectedTab)
        console.log("gettin")
    }
    
         
    return (
        <IonTabs onIonTabsDidChange={(e: TabsCustomEvent)}>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/menu" />
                <Route exact path="/tabs">
                    <Redirect to="/tabs/menu" />
                </Route>
                <Route exact path="/tabs/menu">
                    <Menu />
                </Route>
                <Route exact path="/tabs/food">
                    <FoodRouter/>
                </Route>

                <Route exact path="/tabs/exercise">
                    <Exercise />
                </Route>

                <Route exact path="/tabs/exercise/add"
                    component={AddExercise} />

            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton
                    tab="menu"
                    onClick={handleClick}
                    className={(selected === "menu") ? "selected-tab" : ""}
                    href="/tabs/menu">
                    <img className="tab-bar-button" src="src/assets/menu.png" />
                    <IonLabel>Menú</IonLabel>
                </IonTabButton>
                <IonTabButton
                    onClick={handleClick}
                    tab="food"
                    className={(selected === "food") ? "selected-tab" : ""}
                    href="/tabs/food">
                    <img className="tab-bar-button" src='src/assets/alimentacion.png' />
                    <IonLabel>Alimento</IonLabel>
                </IonTabButton>
                <IonTabButton 
                    onClick={handleClick}
                    tab="exercise" 
                    className={(selected === "exercise") ? "selected-tab" : ""}
                    href="/tabs/exercise">
                    <img className="tab-bar-button" src='src/assets/ejercicios.png' />
                    <IonLabel>Ejercicio</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}