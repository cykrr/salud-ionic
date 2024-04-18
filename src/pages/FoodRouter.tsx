import { IonContent, IonHeader, IonPage, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";
import AddFood from "./AddFood";
import CreateFood from "./CreateFood";
import Food from "./Food";
import { IonReactRouter } from "@ionic/react-router";
import { useEffect, useRef } from "react";

export default function FoodRouter() {
    const router_outlet = useRef<HTMLIonRouterOutletElement>(null)
    function reset() { 
        if (router_outlet.current) {
            const outlet = router_outlet.current;
            if (outlet.children.length > 0) {
                outlet.removeChild(outlet.children[outlet.children.length - 1]);
            }
        }

    }
    return <IonPage>
        <IonContent>
            <IonReactRouter>
                <IonRouterOutlet ref={router_outlet}>
                    <Route exact path="/tabs/food">
                        <Food/>
                    </Route>
                    <Route exact path="/tabs/food/add">
                        <AddFood/>
                    </Route>
                    <Route exact path="/tabs/food/create">
                        <CreateFood/>
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonContent>
    </IonPage>
}