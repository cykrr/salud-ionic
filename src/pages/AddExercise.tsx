import CloseButton from "../components/CloseButton"
import Select from "../components/Select"
import InputUnit from "../components/InputUnit"
import Button from "../components/Button"
import { useIonRouter } from "@ionic/react"

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default function AddExercise() {
    const retroceder = useIonRouter();
    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <div className="flex w-full h-full flex-col">
                    <div className="flex flex-col gap-8 p-20 mx-auto">
                        <div className="flex justify-between items-center">
                            <h1>Selecionar ejercicio</h1>
                            <CloseButton />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Select>
                                <option value={0}>Seleccione ejercicio</option>
                            </Select>
                            <InputUnit className="" inputType="number" placeholder="Tiempo" unit="min." />
                        </div>
                        <Button className="self-center" onClick={()=>retroceder.goBack()}>Agregar</Button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}