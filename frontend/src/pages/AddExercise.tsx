import { CloseButton, Select, InputUnit, Button } from '../components'

import { IonContent, IonHeader, IonPage, IonAlert } from '@ionic/react';

import { API_URL, UserContext, updateToken } from '../App';
import { useContext, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router';

interface Exercise {
    id: number;
    nombre: string;
}

export default function AddExercise() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [exerciseData, setExerciseData] = useState<Exercise[]>();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${API_URL}/exercise`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            });

            if (response.status == 401) {
                updateToken(setUserData, '');
                return;
            }
            updateToken(setUserData, response.headers.get("Token")!)
            
            const data = await response.json();
            setExerciseData(data);
        }
        fetchData();
    }, [userData.idUsuario]);

    function renderExercise() {
        if (!exerciseData) return null;
        return exerciseData.map((exercise) => {
            return <option key={exercise.id} value={exercise.id}>{exercise.nombre}</option>        
        })
    }

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        var idEjercicio = parseInt(formRef.current!.querySelector<HTMLSelectElement>("#selectExercise")?.value!);
        var minutos = parseInt(formRef.current!.querySelector<HTMLInputElement>("#inputMinutos")?.value!);
        
        if (idEjercicio == 0) {
            setAlertMessage("Por favor, selecciona un ejercicio")
        } else if (minutos == 0) {
            setAlertMessage("Por favor, ingresa los minutos")
        } else {
            fetch(`${API_URL}/user/exercise`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${userData.token}`
                },
                body: new URLSearchParams({
                    'idUsuario': userData.idUsuario.toString(),
                    'idEjercicio': idEjercicio.toString(),
                    'minutos': minutos.toString()
                })
            }).then(async response => {
                if (response.status == 401) {
                    updateToken(setUserData, '');
                    return;
                }
                updateToken(setUserData, response.headers.get("Token")!)

                const data : any = await response.json();
                if (data.success == true) {
                    setAlertMessage("Ejercicio registrado con éxito")
                    setFormSubmitted(true)
                } else {
                    setAlertMessage("Ocurrió un error al intentar registrar el ejercicio. Inténtalo más tarde")
                }
                setShowAlert(true)
            })
            return 
        }

        setShowAlert(true)
    }

    return (
        <IonPage>
            <IonContent>
                { (formSubmitted && !showAlert) ? <Redirect to="/tabs/exercise" /> : null}
                <div className="flex w-full h-full flex-col">
                    <div className="flex flex-col gap-8 p-10 mx-auto">
                        <div className="flex justify-between items-center">
                            <h1>Selecionar ejercicio</h1>
                            <CloseButton />
                        </div>
                        <form ref={formRef} onSubmit={submitForm} className="flex flex-col items-center gap-8">
                            <div className="flex flex-col gap-3">
                                <Select id="selectExercise" label="Ejercicio">
                                    <option value={0}>Seleccione ejercicio</option>
                                    { userData.idUsuario ? renderExercise() : null}
                                </Select>
                                <InputUnit id="inputMinutos" className="" inputType="number" label="Tiempo" unit="min." />
                            </div>
                            <Button btnType="submit" className="self-center">Agregar</Button>
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
    );
}