import { IonPage, IonToolbar, IonTitle, IonHeader, IonContent, IonRouterLink } from '@ionic/react';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import SelectRegionComuna from '../components/SelectRegionComuna';
import RutInput from '../components/RutInput';

import { useHistory } from 'react-router';

import { useRef } from 'react';
export default function Register() {
    const formRef = useRef<HTMLFormElement>(null)
    const history = useHistory()
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const user = formRef.current?.elements['user'].value
        const rut = formRef.current?.elements['rut'].value
        const edad = formRef.current?.elements['edad'].value
        const genero = formRef.current?.elements['genero'].value
        const correo = formRef.current?.elements['correo'].value
        const password = formRef.current?.elements['password'].value
        const confirm_password = formRef.current?.elements['confirm_password'].value
        const region = formRef.current?.elements['region'].value
        const comuna = formRef.current?.elements['comuna'].value
        console.log("Region: " + region)
        console.log("Comuna: " + comuna)
        console.log("Edad: " + edad)
        console.log("Genero: " + genero)
        console.log("Correo: " + correo)
        console.log("Contraseña: " +   password)
        console.log("Confirmar contraseña: " + confirm_password)
        console.log("Usuario: " + user)
        console.log("RUT: " + rut)
        if (user.length < 5) {
            alert("El usuario debe tener a lo menos 5 caracteres")
        } else if (password !== confirm_password) {
            alert("Las contraseñas no coinciden")
        } else if (password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres")
        } else if (rut.length < 12) {
            alert("El RUT no es válido")
        } else if (edad < 0) {
            alert("La edad no puede ser negativa")
        } else if (edad < 18) {
            alert("Debes ser mayor de edad para registrarte")
        } else if (correo.length < 5) {
            alert("El correo no es válido")
        } else if (correo.indexOf('@') === -1 || correo.indexOf('.') === -1) {
            alert("El correo no es válido")
        } else {
            alert("Registro exitoso")
            history.push("/terms_and_conditions")
        }
    }
    return (
        <IonPage>
            <IonContent>
                <div className="flex w-full h-full">
                    <div className='flex flex-col items-center gap-6 p-10 m-auto'>
                        <p className="text-xl font-bold">Registro</p>
                        <form id = "input" ref={formRef} onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-1.5">
                                        <Input id="user" className="w-full" placeholder="Usuario" inputType="text"></Input>
                                        <RutInput id="rut" className="w-full"></RutInput>
                                    </div>
                                    <SelectRegionComuna></SelectRegionComuna>
                                    <Input id="edad" className="w-full" inputType="number" placeholder="Edad"></Input>
                                    <Select id="genero" className="w-full">
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                        <option value="other">Otro</option>
                                    </Select>
                                    <Input id="correo" placeholder="Correo" className="w-full"></Input>
                                    <Input id="password" inputType="password" placeholder="Contraseña" className="w-full"></Input>
                                    <Input id="confirm_password" inputType="password" placeholder="Confirmar contraseña" className="w-full"></Input>
                                </div>
                                <Button className="self-center" btnType='submit'>
                                    Registrarse
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}