import CloseButton from "../components/CloseButton"
import Select from "../components/Select"
import InputUnit from "../components/InputUnit"
import Button from "../components/Button"

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default function AddFood() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Seleccionar alimento</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex w-full h-full flex-col">
                    <div className="flex h-full flex-col p-20 gap-8">
                        <div className="flex justify-between items-center">
                            <h1>Selecionar alimento</h1>
                            <CloseButton />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Select>
                                <option value={0} selected>Seleccione alimento</option>
                            </Select>
                            <InputUnit className="" inputType="number" placeholder="Tamaño porción" unit="g/mL." />
                        </div>
                        <Button>Agregar</Button>
                        <div className="flex flex-col gap-1 text-center">
                            <p>¿No encuentras tu alimento en la lista?</p>
                            <a className="text-pink-500 text-lg font-semibold underline" href="">Añádelo aquí</a>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
