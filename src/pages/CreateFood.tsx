import { IonPage, IonToolbar, IonTitle, IonHeader, IonContent, IonRouterLink } from '@ionic/react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import CloseButton from '../components/CloseButton';


export default function CreateFood() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Crear alimento</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex w-full h-full flex-col">
                    <div className="flex h-full flex-col p-20 gap-8">
                        <div className="flex justify-between items-center">
                            <h1>Nuevo alimento</h1>
                            <CloseButton/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input inputType="text" placeholder="Nombre"></Input>
                            <Input inputType="number" placeholder="Calorías"></Input>
                            <div className="flex flex-row gap-2">
                                <Input className="w-full" inputType="number" placeholder="Tamaño porción"></Input>
                                <Select>
                                    <option value={0} selected>Seleccione unidad</option>
                                    <option value={1}>g.</option>
                                    <option value={2}>mL.</option>
                                </Select>
                            </div>
                        </div>
                        <Button>Agregar</Button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}