import { IonPage, IonToolbar, IonTitle, IonHeader, IonContent, IonRouterLink } from '@ionic/react';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import SelectRegionComuna from '../components/SelectRegionComuna';
import RutInput from '../components/RutInput';


export default function Register() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex  h-full justify-center align-center">
                    <div className="flex justify-center items-center h-full flex-col">
                        <div id="register" className="text-center max-w-50 h-full flex flex-col justify-center items-center">
                            <label className='text-xl bold'>Registro</label>
                            <div className="h-6"></div>
                            <div className="px-10">
                                <div className="flex flex-row space-x-2.5">
                                    <Input className="w-1/2" placeholder={"Usuario"} inputType={"text"}></Input>
                                    <RutInput className="w-1/2"></RutInput>
                                </div>
                                <div className="flex flex-row min-w-0">
                                    <SelectRegionComuna/>
                                </div>
                                <div className="flex flex-row space-x-2.5">
                                    <Input className="w-full" inputType="number" placeholder="Edad"></Input>
                                    <Select className="w-full">
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                        <option value="other">Otro</option>
                                    </Select>
                                </div>
                                <Input placeholder="Correo" className="w-full"></Input>
                                <Input inputType="password" placeholder="Contraseña" className="w-full"></Input>
                                <Input inputType="password" placeholder="Confirmar contraseña" className="w-full"></Input>
                                <div className="flex justify-center">
                                    <div className="flex flex-col mx-20 gap-3">
                                        <Button>Registrarse</Button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}