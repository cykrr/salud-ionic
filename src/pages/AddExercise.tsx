import {CloseButton, Select, InputUnit, Button} from '../components'
import { useIonRouter } from "@ionic/react"

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAlert } from '@ionic/react';

import { UserContext } from '../App';
import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router';
import { data } from 'autoprefixer';

    interface Exercise {
        id: number;
        nombre: string;
    }

export default function AddExercise() {
    const {userData, setUserData} = React.useContext(UserContext);
    const [exerciseData, setExerciseData] = React.useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/exercise/get', {
                method: 'GET'
            });
            const data = await response.json();
            setExerciseData(data);
        }
        fetchData();
        console.log(data)
    }, [userData.idUsuario]);

    function renderExercise() {
        if (!exerciseData) return null;
        return exerciseData.map((exercise: Exercise) => {
            return <option key={exercise.id} value={exercise.id}>{exercise.nombre}</option>        
        })
    }

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        var idEjercicio = parseInt(formRef.current!.querySelector<HTMLSelectElement>("#selectExercise")?.value ?? "0", 10);
        var minutos = parseInt(formRef.current!.querySelector<HTMLInputElement>("#inputMinutos")?.value ?? "0", 10);
        
        if (idEjercicio == 0) {
            setAlertMessage("Por favor, selecciona un ejercicio")
        } else if (minutos == 0) {
            setAlertMessage("Por favor, ingresa los minutos")
        } else {
            fetch('http://localhost:5000/exercises/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'idUsuario': userData.idUsuario,
                    'idEjercicio': idEjercicio.toString(),
                    'Minutos': minutos.toString()
                })
            }).then(response => response.json()).then(data => {
                if (data.success == true) {
                    setAlertMessage("Ejercicio registrado con éxito")
                    setShowAlert(true)
                    setFormSubmitted(true)
                } else {
                    setAlertMessage("Ocurrió un error al intentar registrar el ejercicio. Inténtalo más tarde")
                }
            }) 
        }

        setShowAlert(true)
    }

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                { userData.idUsuario ? null : <Redirect to="/login" /> }
                { (formSubmitted && !showAlert) ? <Redirect to="/tabs/exercise" /> : null}
                <div className="flex w-full h-full flex-col">
                    <div className="flex flex-col gap-8 p-20 mx-auto">
                        <div className="flex justify-between items-center">
                            <h1>Selecionar ejercicio</h1>
                            <CloseButton />
                        </div>
                        <form ref={formRef} onSubmit={submitForm} className="flex flex-col items-center gap-8">
                            <div className="flex flex-col gap-2">
                                <Select id="selectExercise">
                                    <option value={0}>Seleccione ejercicio</option>
                                    { userData.idUsuario ? renderExercise() : null}
                                </Select>
                                <InputUnit id="inputMinutos" className="" inputType="number" placeholder="Tiempo" unit="min." />
                            </div>
                            <Button btnType="submit" className="self-center">Agregar</Button>
                            <IonAlert
                                isOpen={showAlert}
                                onDidDismiss={() => setShowAlert(false)}
                                header="Error"
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