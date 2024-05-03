import Input from '../components/Input';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';

import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';

import { IonContent, IonPage, IonAlert } from '@ionic/react';


export default function Login() {
    const formRef = useRef<HTMLFormElement>(null)
    const history = useHistory()
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const user: string = formRef.current?.elements["user"].value
        const password: string = formRef.current?.elements["password"].value

        if (user.trim() === "") {
            setAlertMessage("Por favor, ingrese su usuario")
        }  
        else if (password.trim() === "") {
            setAlertMessage("Por favor, ingrese su contraseña")
        }
        else if (password.length < 8) {
            setAlertMessage("Su contraseña debe tener al menos 8 caracteres.")
        }
        else {
            // Redirect to href="/home" with React Router
            console.log("Redirecting to /menu")
            history.push("/tabs") 
        }

        setShowAlert(true);
    }

    return (
        <IonPage>
            <IonContent>
                <div className="flex w-full h-full flex-col">
                    <div id="login" className="flex flex-col justify-center items-center p-20 m-auto gap-10">
                        <h1 className="text-xl text-bold">Bienvenido</h1>
                        <form ref={formRef} id="login" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-10 items-center">
                                <div className="flex flex-col">
                                    <Input id="user" inputType={"text"} placeholder={"Usuario"}/>
                                    <Input id="password" inputType={"password"} placeholder={"Contraseña"} />
                                </div>
                                <div className="flex flex-col gap-2.5 max-w-40">
                                    <Button btnType="submit">
                                        Ingresar
                                    </Button>
                                    <IonAlert
                                        isOpen={showAlert}
                                        onDidDismiss={() => setShowAlert(false)}
                                        header={'Error'}
                                        message={alertMessage}
                                        buttons={['OK']}
                                    />
                                    <LinkButton href="/signup">Registrarse</LinkButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}