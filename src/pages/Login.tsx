import Input from '../components/Input';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';

import React, { useState, useRef, useContext } from 'react';
import { Redirect } from 'react-router';

import { IonContent, IonPage, IonAlert } from '@ionic/react';

import { UserContext } from '../App';


export default function Login() {
    const formRef = useRef<HTMLFormElement>(null)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {userData, setUserData} = useContext(UserContext)!;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const user = formRef.current?.querySelector<HTMLInputElement>("#user")!.value!
        const password = formRef.current?.querySelector<HTMLInputElement>("#password")!.value!

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
            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'user': user,
                    'password': password
                })
            }). then(response => response.json()).then(data => {
                setShowAlert(true)
                
                if (data.success == true) {
                    setAlertMessage("Inicio de sesión exitoso")
                    setIsLoggedIn(true)
                    setUserData({idUsuario: data.user})

                } else {
                    setAlertMessage("Usuario o contraseña incorrectos")
                }
            })

            return;
        }

        setShowAlert(true);
    }

    return (
        <IonPage>
            <IonContent>
                {(isLoggedIn && !showAlert) ? <Redirect to="/" /> : null}
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
                                        header={isLoggedIn? "Éxito" : 'Error'}
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