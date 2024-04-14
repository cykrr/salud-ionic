import Input from '../components/Input';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';

import React, { useState, useRef } from 'react';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';
export default function Login() {
    const formRef = useRef<HTMLFormElement>(null)

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(formRef)

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
                        <div className="h-16"></div>
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