import { IonPage, IonHeader, IonContent, IonAlert } from '@ionic/react';
import Button from '../components/Button';
import CloseButton from '../components/CloseButton';
import { useContext, useEffect, useRef, useState } from 'react';
import { API_URL, UserContext, updateToken } from '../App';
import { useHistory, useLocation } from 'react-router';
import { Exercise } from './AdminExercise';
import Input from '../components/Input';

export default function CreateExercise() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const history = useHistory();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const strData = queryParams.get('data');
    const jsonData : Exercise = JSON.parse(strData!);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const nombre = formRef.current?.querySelector<HTMLInputElement>("#inputNombre")!.value!
        const calorias = formRef.current?.querySelector<HTMLInputElement>("#inputCalorias")!.value!
        
        if (nombre === "") {
            setAlertMessage("Por favor, ingresa un nombre")
        }
        else if (calorias === "") {
            setAlertMessage("Por favor, ingresa las calorías")
        }
        else {
            fetch(`${API_URL}/exercise`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                },
                body: new URLSearchParams({
                    'idEjercicio': jsonData.id.toString(),
                    'nombre': nombre,
                    'calorias': calorias
                })
            }).then(async response => {
                if (response.status == 401) {
                    updateToken(setUserData, '');
                    return;
                }
                updateToken(setUserData, response.headers.get("Token")!)
                
                const data : any = await response.json()
                if (data.success == true) {
                    setAlertMessage("Ejercicio actualizado con éxito")
                    setFormSubmitted(true)
                    setShowAlert(true)
                } else {
                    throw new Error()
                }
            }).catch(() => {
                setAlertMessage("Ocurrió un error al guardar el ejercicio")
                setShowAlert(true)
            })
            return 
        }

        setShowAlert(true)
    }

    useEffect(() => {
        if (formSubmitted && !showAlert) {
            history.goBack();
        }
    }, [formSubmitted, showAlert, history]);
    
    return (
        <IonPage>
            <IonContent>
                <div className="flex w-full h-full flex-col items-center">
                    <div className="flex flex-col gap-8 p-10 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h1>Editar ejercicio</h1>
                            <CloseButton/>
                        </div>
                        <form ref={formRef} onSubmit={submitForm} className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <Input id="inputNombre" inputType="text" label="Nombre" defaultValue={jsonData.nombre}></Input>
                                <Input id="inputCalorias" inputType="number" label="Calorías por hora" defaultValue={jsonData.calorias.toString()}></Input>
                            </div>
                            <Button btnType="submit" className="self-center">Guardar</Button>
                            <IonAlert
                                isOpen={showAlert}
                                onDidDismiss={() => setShowAlert(false)}
                                header={formSubmitted? "Éxito" : 'Error'}
                                message={alertMessage}
                                buttons={['OK']}
                            />
                        </form>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}