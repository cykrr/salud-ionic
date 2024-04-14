import Input from '../components/Input';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';

import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';
export default function Login() {
    const formRef = useRef<HTMLFormElement>(null)
    const [warning, setWarning] = useState<React.ReactNode>(null)
    const history = useHistory()

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const user: string = formRef.current?.elements["user"].value
        const password: string = formRef.current?.elements["password"].value
        let warnings = []
        if (user === "") warnings.push(<p key="user_empty" className="text-red-500">Por favor ingrese su Usuario</p>)
        if (password === "") warnings.push(<p key="pass_empty" className="text-red-500">Por favor ingrese su Contraseña</p>)
        if (password.length < 8) warnings.push(<p key="pass_empty" className="text-red-500">Su contraseña debe tener al menos 8 caracteres.</p>)
        else {
            // Redirect to href="/home" with React Router
            console.log("Redirecting to /menu")
            history.push("/menu") 
            
        }
        setWarning(warnings)

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex justify-center items-center h-full flex-col w-30">
                    <div id="login" className="text-center  h-full flex flex-col justify-center items-center">
                        <h1 className="text-xl text-bold">Bienvenido</h1>
                        <div className="p-10">
                            {warning}
                        </div>
                            <form ref={formRef} id="login" onSubmit={handleLogin}>
                                <Input id="user" inputType={"text"} placeholder={"Usuario"}/>
                                <Input id="password" inputType={"password"} placeholder={"Contraseña"} />
                                <div className="h-6"></div>
                                <Button>
                                    <Input
                                        inputType="submit"
                                        value="Iniciar Sesión"
                                    >Iniciar Sesión
                                    </Input>
                                </Button>
                            </form>
                            <div className="h-2"></div>
                            <div className="flex justify-center">
                                <div className="w-full flex flex-col mx-20 gap-3">
                                    <LinkButton href="/signup">Registrarse</LinkButton>
                                </div>
                            </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}