import { Button, CloseButton, InputUnit, Select } from '../components'
import { IonAlert, IonRouterLink } from '@ionic/react'

import { IonContent, IonHeader, IonPage } from '@ionic/react';

import { API_URL, UserContext } from '../App';
import { useContext, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router';

interface Food {
    id: number;
    nombre: string;
    unidad: string;
}

export default function AddFood() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [foodData, setFoodData] = useState<Food[]>();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (foodData) return;
        const fetchData = async () => {
            const response = await fetch(`${API_URL}/food/get?id=` + userData.idUsuario, {
                method: 'GET'
            });
            const data = await response.json();
            setFoodData(data);
        }
        fetchData();
    }, [userData.idUsuario]);

    function renderFood() {
        if (!foodData) return null;
        return foodData.map((food) => {
            return <option key={food.id} value={food.id}>{food.nombre}</option>        
        })
    }

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        var idAlimento = parseInt(formRef.current!.querySelector<HTMLSelectElement>("#selectFood")?.value ?? "0", 10);
        var porcion = parseInt(formRef.current!.querySelector<HTMLInputElement>("#inputPorcion")?.value ?? "0", 10);
        
        if (idAlimento == 0) {
            setAlertMessage("Por favor, selecciona un alimento")
        } else if (porcion == 0) {
            setAlertMessage("Por favor, ingresa una porción")
        } else {
            fetch(`${API_URL}/food/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'idUsuario': userData.idUsuario.toString(),
                    'idAlimento': idAlimento.toString(),
                    'cantidad': porcion.toString()
                })
            }).then(response => response.json()).then(data => {
                if (data.success == true) {
                    setAlertMessage("Alimento registrado con éxito")
                    setFormSubmitted(true)
                } else {
                    setAlertMessage("Ocurrió un error al intentar registrar el alimento. Inténtalo más tarde")
                }
            }).finally(()=>{
                setShowAlert(true)
            })
            return 
        }

        setShowAlert(true)
    }

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                { userData.idUsuario ? null : <Redirect to="/login" /> }
                { (formSubmitted && !showAlert) ? <Redirect to="/tabs/food" /> : null}
                <div className="flex w-full h-full flex-col">
                    <div className="flex flex-col gap-8 p-10 mx-auto">
                        <div className="flex justify-between items-center">
                            <h1>Selecionar alimento</h1>
                            <CloseButton />
                        </div>
                        <form ref={formRef} onSubmit={submitForm} className="flex flex-col items-center gap-8">
                            <div className="flex flex-col gap-2">
                                <Select id="selectFood">
                                    <option value={0}>Seleccione alimento</option>
                                    { userData.idUsuario ? renderFood() : null}
                                </Select>
                                <InputUnit id="inputPorcion" className="" inputType="number" placeholder="Tamaño porción" unit="g/mL." />
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
