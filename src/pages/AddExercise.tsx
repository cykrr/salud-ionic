import CloseButton from "../components/CloseButton"
import Select from "../components/Select"
import InputUnit from "../components/InputUnit"
import Button from "../components/Button"

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default function AddExercise() {
    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <div className="flex w-full h-full flex-col p-20 items-center">
                    <div className="flex h-full flex-col gap-8 w-96">
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
                        <Button className="self-center">Agregar</Button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}