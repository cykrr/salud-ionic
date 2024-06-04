import { IonFab, IonFabButton, IonIcon, TabsCustomEvent } from '@ionic/react';
import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonLabel } from '@ionic/react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { useState } from 'react'
import AdminFood from './AdminFood';

import './Tabs.css'
import AdminExercise from './AdminExercise';
import { add } from 'ionicons/icons';

export default function MainTabRoot() {
    const [selected, setSelected] = useState('menu');
    function handleClick(e: TabsCustomEvent) {
        const selectedTab: string = e['detail']['tab']
        setSelected(selectedTab)
    }

    function tabMatch(tabName: string) {
        return useLocation().pathname.includes(tabName)
    }

    return (
        <>
            <IonTabs onIonTabsDidChange={handleClick}>
                <IonRouterOutlet>
                    <Redirect exact path="/admin" to="/admin/food" />
                    <Route exact path="/admin/food">
                        <AdminFood />
                    </Route>
                    <Route exact path="/admin/exercise">
                        <AdminExercise />
                    </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom" className="tab-bar-blue">
                    <IonTabButton
                        tab="food"
                        className={tabMatch("food") ? "selected-tab-blue" : "tab-bar-blue"}
                        href="/admin/food">
                        <img className="tab-bar-button" src="src/assets/alimentacion.png" />
                        <IonLabel>Alimentos</IonLabel>
                    </IonTabButton>
                    <IonTabButton
                        tab="exercise"
                        className={tabMatch("exercise") ? "selected-tab-blue" : "tab-bar-blue"}
                        href="/admin/exercise">
                        <img className="tab-bar-button" src='src/assets/ejercicios.png' />
                        <IonLabel>Ejercicios</IonLabel>
                    </IonTabButton>

                </IonTabBar>
            </IonTabs>

            <IonFab vertical="bottom" horizontal="center" className="center-fab">
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

            <style>{`
                    .center-fab {
                        position: absolute;
                        transform: translateY(-50%);
                        bottom: 0;
                    }
                `}
            </style>
        </>
    )
}