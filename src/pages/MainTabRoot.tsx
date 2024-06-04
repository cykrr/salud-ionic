import { NavBar } from "../components";
import MainTabs from "./MainTabs";
import { AddFood, AddExercise, CreateFood } from "./";

import { IonContent, IonHeader, IonPage, TabsCustomEvent } from '@ionic/react';
import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonNav } from '@ionic/react';
import { NavLink, Redirect, Route, useLocation } from 'react-router-dom';
import { triangle, ellipse, square } from 'ionicons/icons';

import { Menu, Food, Exercise } from '.'

import { useState } from 'react'

import './Tabs.css'

export default function MainTabRoot() {
    const [selected, setSelected] = useState('menu');
    function handleClick(e: TabsCustomEvent) {
        const selectedTab: string = e['detail']['tab']
        setSelected(selectedTab)
        // console.log(selectedTab)
    }

    function tabMatch(tabName: string) {
        return useLocation().pathname.includes(tabName)
    }

    return (
        <IonTabs onIonTabsDidChange={handleClick}>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/menu" />
                <Route exact path="/tabs/menu">
                    <Menu />
                </Route>
                <Route exact path="/tabs/food">
                    <Food />
                </Route>
                
                <Route exact path="/tabs/exercise">
                    <Exercise/>
                </Route>


            </IonRouterOutlet>
            <IonTabBar slot="bottom" className="tab-bar-green">
                <IonTabButton
                    tab="menu"
                    className={tabMatch("menu") ? "selected-tab-green" : "tab-bar-green"}
                    href="/tabs/menu">
                    <img className="tab-bar-button" src="src/assets/menu.png" />
                    <IonLabel>Menú</IonLabel>
                </IonTabButton>
                <IonTabButton
                    tab="food"
                    className={tabMatch("food") ? "selected-tab-green" : "tab-bar-green"}
                    href="/tabs/food">
                    <img className="tab-bar-button" src='src/assets/alimentacion.png' />
                    <IonLabel>Alimento</IonLabel>
                </IonTabButton>
                <IonTabButton 
                    tab="exercise" 
                    className={tabMatch("exercise") ? "selected-tab-green" : "tab-bar-green"}
                    href="/tabs/exercise">
                    <img className="tab-bar-button" src='src/assets/ejercicios.png' />
                    <IonLabel>Ejercicio</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}