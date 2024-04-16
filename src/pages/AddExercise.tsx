import CloseButton from "../components/CloseButton"
import Select from "../components/Select"
import InputUnit from "../components/InputUnit"
import Button from "../components/Button"

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default function AddExercise() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Seleccionar ejercicio</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex w-full h-full flex-col">
                    <div className="flex h-full flex-col p-20 gap-8">
                        <div className="flex justify-between items-center">
                            <h1>Selecionar ejercicio</h1>
                            <CloseButton />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Select>
                                <option value={0}>Seleccione ejercicio</option>
                            </Select>
                            <InputUnit className="" inputType="number" placeholder="Tiempo/Repeticiones" unit="min/rep." />
                        </div>
                        <Button>Agregar</Button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}