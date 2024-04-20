import { Button, CloseButton, InputUnit, Select } from '../components'
import { IonRouterLink } from '@ionic/react'

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default function AddFood() {
    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <div className="flex w-full h-full flex-col p-20 items-center">
                    <div className="flex h-full flex-col gap-8 w-96">
                        <div className="flex justify-between items-center">
                            <h1>Selecionar alimento</h1>
                            <CloseButton />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Select>
                                <option value={0}>Seleccione alimento</option>
                            </Select>
                            <InputUnit className="" inputType="number" placeholder="Tamaño porción" unit="g/mL." />
                        </div>
                        <Button className="self-center">Agregar</Button>
                        <div className="flex flex-col gap-1 text-center">
                            <p>¿No encuentras tu alimento en la lista?</p>
                            <IonRouterLink routerLink="/food_create" routerDirection='forward' >
                                <a className="text-pink-500 text-lg font-semibold underline" href="">Añádelo aquí</a>
                            </IonRouterLink>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
