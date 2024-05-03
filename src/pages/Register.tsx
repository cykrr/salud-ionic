import { IonPage, IonContent, IonAlert } from '@ionic/react';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import SelectRegionComuna from '../components/SelectRegionComuna';
import RutInput from '../components/RutInput';

import { useHistory } from 'react-router';

import { useRef, useState } from 'react';


export default function Register() {
    const formRef = useRef<HTMLFormElement>(null)
    const history = useHistory()
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

        if (user.length < 5) {
            setAlertMessage("El usuario debe tener a lo menos 5 caracteres")
        } else if (rut.length < 12) {
            setAlertMessage("El RUT no es válido")
        } else if (region == 0) {
            setAlertMessage("Por favor, seleccione una región")
        } else if (comuna == 0) {
            setAlertMessage("Por favor, seleccione una comuna")
        } else if (edad < 0) {
            setAlertMessage("La edad no puede ser negativa")
        } else if (edad < 18) {
            setAlertMessage("Debes ser mayor de edad para registrarte")
        } else if (genero == 0) {
            setAlertMessage("Por favor, seleccione su género")
        } else if (correo.length < 5) {
            setAlertMessage("El correo no es válido")
        } else if (correo.indexOf('@') === -1 || correo.indexOf('.') === -1) {
            setAlertMessage("El correo no es válido")
        } else if (password !== confirm_password) {
            setAlertMessage("Las contraseñas no coinciden")
        } else if (password.length < 8) {
            setAlertMessage("La contraseña debe tener al menos 8 caracteres")
        } else {
            let response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    user: user,
                    rut: rut,
                    edad: edad,
                    genero: genero,
                    correo: correo,
                    password: password,
                    confirm_password: confirm_password,
                    region: region,
                    comuna: comuna
                })
            
            })
            if (response.status !== 200) {
                let json = await response.json()
                alert(json.error)
            } else {
                alert("Usuario registrado exitosamente")
                history.push('/terms_and_conditions')
            }
                
            return;
        }

        setShowAlert(true);
    }

    return (
        <IonPage>
            <IonContent>
                <div className="flex w-full h-full">
                    <div className='flex flex-col items-center gap-6 p-20 m-auto'>
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
                                        <option value={0}>Seleccione género</option>
                                        <option value={1}>Masculino</option>
                                        <option value={2}>Femenino</option>
                                        <option value={3}>Otro</option>
                                    </Select>
                                    <Input id="correo" placeholder="Correo" className="w-full"></Input>
                                    <Input id="password" inputType="password" placeholder="Contraseña" className="w-full"></Input>
                                    <Input id="confirm_password" inputType="password" placeholder="Confirmar contraseña" className="w-full"></Input>
                                </div>
                                <Button className="self-center" btnType='submit'>
                                    Registrarse
                                </Button>
                                <IonAlert
                                    isOpen={showAlert}
                                    onDidDismiss={() => setShowAlert(false)}
                                    header={'Error'}
                                    message={alertMessage}
                                    buttons={['OK']}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}