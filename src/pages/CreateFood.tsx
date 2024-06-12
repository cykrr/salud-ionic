import { IonPage, IonContent, IonAlert } from '@ionic/react';
import Button from '../components/Button';
import CloseButton from '../components/CloseButton';
import { useContext, useEffect, useRef, useState } from 'react';
import { API_URL, UserContext } from '../App';
import { useHistory } from 'react-router';
import Select from '../components/Select';
import Input from '../components/Input';


export default function CreateFood() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null)
    const history = useHistory()
    
    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const nombre = formRef.current?.querySelector<HTMLInputElement>("#inputNombre")!.value!
        const caloriasStr = formRef.current?.querySelector<HTMLInputElement>("#inputCalorias")!.value!
        const porcionStr = formRef.current?.querySelector<HTMLInputElement>("#inputPorcion")!.value!
        const unidadStr = formRef.current?.querySelector<HTMLSelectElement>("#selectUnidad")!.value!

        const unidad = parseInt(unidadStr)
        
        if (nombre === "") {
            setAlertMessage("Por favor, ingresa un nombre")
        }
        else if (caloriasStr === "") {
            setAlertMessage("Por favor, ingresa las calorías")
        }
        else if (porcionStr === "") {
            setAlertMessage("Por favor, ingresa una porción")
        }
        else if (unidad == 0) {
            setAlertMessage("Por favor, selecciona una unidad")
        }
        else {
            fetch(`${API_URL}/food`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                },
                body: new URLSearchParams({
                    'idUsuario': userData.idUsuario.toString(),
                    'nombre': nombre,
                    'calorias': caloriasStr,
                    'unidad': unidadStr,
                    'porcion': porcionStr
                })
            }).then(response => response.json()).then(data => {
                if (data.success == true) {
                    setAlertMessage("Alimento creado con éxito")
                    setFormSubmitted(true)
                } else {
                    setAlertMessage("Ocurrió un error al crear el alimento")
                }
            }).finally(()=>{
                setShowAlert(true)
            })
            return 
        }

        setShowAlert(true)
    }

    useEffect(() => {
        if (formSubmitted && !showAlert) {
            history.goBack();
        }
    }, [formSubmitted, showAlert, history]);
    
    return (
        <IonPage>
            <IonContent>
                <div className="flex w-full h-full flex-col">
                    <div className="flex flex-col gap-8 mx-auto p-10">
                        <div className="flex justify-between items-center">
                            <h1>Nuevo alimento</h1>
                            <CloseButton/>
                        </div>
                        <form ref={formRef} onSubmit={submitForm} className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <Input id="inputNombre" inputType="text" label="Nombre"></Input>
                                <Input id="inputCalorias" inputType="number" label="Calorías"></Input>
                                <div className="flex flex-row gap-3">
                                    <Input id="inputPorcion" className="w-full" inputType="number" label="Porción"></Input>
                                    <Select id="selectUnidad" label="Unidad">
                                        <option value={0}>Unidad</option>
                                        <option value={1}>g.</option>
                                        <option value={2}>mL.</option>
                                    </Select>
                                </div>
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
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}