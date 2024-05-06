import { IonPage, IonContent, IonAlert } from '@ionic/react';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import SelectRegionComuna from '../components/SelectRegionComuna';
import RutInput from '../components/RutInput';

import { Redirect } from 'react-router';

import { useContext, useRef, useState } from 'react';

import { UserContext } from '../App';


export default function Register() {
    const formRef = useRef<HTMLFormElement>(null)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {userData, setUserData} = useContext(UserContext)!;


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const user = formRef.current?.querySelector<HTMLInputElement>("#user")!.value!
        const rut = formRef.current?.querySelector<HTMLInputElement>("#rut")!.value!
        const regionStr = formRef.current?.querySelector<HTMLSelectElement>("#region")!.value!
        const comunaStr = formRef.current?.querySelector<HTMLSelectElement>("#comuna")!.value!
        const generoStr = formRef.current?.querySelector<HTMLSelectElement>("#genero")!.value!
        const edadStr = formRef.current?.querySelector<HTMLInputElement>("#edad")!.value!
        const correo = formRef.current?.querySelector<HTMLInputElement>("#correo")!.value!
        const password = formRef.current?.querySelector<HTMLInputElement>("#password")!.value!
        const confirm_password = formRef.current?.querySelector<HTMLInputElement>("#confirm_password")!.value!

        const region = parseInt(regionStr)
        const comuna = parseInt(comunaStr)
        const genero = parseInt(generoStr)
        const edad = parseInt(edadStr)

        if (user.length < 5) {
            setAlertMessage("El usuario debe tener a lo menos 5 caracteres")
        } else if (!validarRUT(rut)) {
            setAlertMessage("El RUT no es válido")
        } else if (region == 0) {
            setAlertMessage("Por favor, seleccione una región")
        } else if (comuna == 0) {
            setAlertMessage("Por favor, seleccione una comuna")
        } else if (edadStr === "") {
            setAlertMessage("Por favor, ingrese una edad")
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
            await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    user: user,
                    rut: rut,
                    edad: edadStr,
                    genero: generoStr,
                    correo: correo,
                    password: password,
                    confirm_password: confirm_password,
                    region: regionStr,
                    comuna: comunaStr
                })
            
            }).then(async response => {
                let json = await response.json()
                if(response.status == 200) {
                    setUserData({idUsuario: json.idUsuario})
                    setAlertMessage("Usuario registrado exitosamente")
                } else {
                    setAlertMessage(json.message)
                }
            }).catch((e) => {
                setAlertMessage("Ocurrió un error con la base de datos.")
            }).finally(() => {
                setShowAlert(true)
            })
                
            return;
        }

        setShowAlert(true);
    }

    function validarRUT(rut: string) {
        // Eliminar puntos y guión, y convertir 'K' en 'k'
        rut = rut.replace(/[^\dkK]/g, '').toLowerCase();
    
        // Validar el formato del RUT
        if (!/^\d{1,8}[0-9k]$/i.test(rut)) {
            return false;
        }
    
        // Extraer el dígito verificador
        const dv = rut.slice(-1);
    
        // Extraer el cuerpo del RUT (sin el dígito verificador)
        const cuerpo = rut.slice(0, -1);
    
        // Calcular el dígito verificador esperado
        let suma = 0;
        let multiplicador = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        const dvEsperado = 11 - (suma % 11);
        const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'k' : dvEsperado.toString();
    
        // Comparar el dígito verificador calculado con el dígito verificador proporcionado
        return dv === dvCalculado;
    }

    return (
        <IonPage>
            <IonContent>
                { userData.idUsuario && !showAlert ? <Redirect to="/terms_and_conditions" /> : null}
                <div className="flex w-full h-full">
                    <div className='flex flex-col items-center gap-6 p-20 m-auto'>
                        <p className="text-xl font-bold">Registro</p>
                        <form id = "input" ref={formRef} onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-1.5">
                                        <Input id="user" className="w-full" placeholder="Usuario" maxLength={30} inputType="text"></Input>
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
                                    <Input id="correo" placeholder="Correo" className="w-full" maxLength={50}></Input>
                                    <Input id="password" inputType="password" placeholder="Contraseña" className="w-full" maxLength={30}></Input>
                                    <Input id="confirm_password" inputType="password" placeholder="Confirmar contraseña" className="w-full" maxLength={30}></Input>
                                </div>
                                <Button className="self-center" btnType='submit'>
                                    Registrarse
                                </Button>
                                <IonAlert
                                    isOpen={showAlert}
                                    onDidDismiss={() => setShowAlert(false)}
                                    header={userData.idUsuario ? 'Éxito' : 'Error'}
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