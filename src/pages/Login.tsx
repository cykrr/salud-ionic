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
        if (password.length < 8 && password !== "") warnings.push(<p key="pass_empty" className="text-red-500">Su contraseña debe tener al menos 8 caracteres.</p>)
        else if (password.length > 8 && user.length > 0) {
            // Redirect to href="/home" with React Router
            console.log("Redirecting to /menu")
            history.push("/tabs") 
            
        }
        setWarning(warnings)

    }

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent className="p-5">
                <div className="flex justify-center items-center h-full flex-col w-30">
                    <div id="login" className="text-center  h-full flex flex-col justify-center items-center">
                        <h1 className="text-xl text-bold">Bienvenido</h1>
                        <div className="p-10">
                            {warning}
                        </div>
                            <form ref={formRef} id="login" onSubmit={handleLogin}>
                                <div className="flex flex-col align-center justify-center items-center">
                                    <Input id="user" inputType={"text"} placeholder={"Usuario"}/>
                                    <Input id="password" inputType={"password"} placeholder={"Contraseña"} />
                                    <div className="h-6"></div>
                                    <div className="flex flex-col gap-2.5 max-w-32">
                                        <Button btnType="submit">
                                        Ingresar
                                        </Button>
                                        <LinkButton className='w-full'  href="/signup">Registrarse</LinkButton>

                                </div>
                                </div>
                            </form>
                            <div className="h-2"></div>
                            <div className="flex justify-center">
                                <div className="w-full flex flex-col mx-20 gap-3">
                                </div>
                            </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}