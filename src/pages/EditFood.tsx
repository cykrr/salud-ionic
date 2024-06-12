import { IonPage, IonContent, IonAlert } from '@ionic/react';
import Button from '../components/Button';
import CloseButton from '../components/CloseButton';
import { useContext, useEffect, useRef, useState } from 'react';
import { API_URL, UserContext } from '../App';
import { useHistory, useLocation } from 'react-router';
import { Food } from './AdminFood';
import Input from '../components/Input';
import Select from '../components/Select';

export default function EditFood() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const history = useHistory();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const strData = queryParams.get('data');
    const jsonData : Food = JSON.parse(strData!);
    
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
            fetch(`${API_URL}/food/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                },
                body: new URLSearchParams({
                    'idAlimento': jsonData.id.toString(),
                    'nombre': nombre,
                    'calorias': caloriasStr,
                    'unidad': unidadStr,
                    'porcion': porcionStr
                })
            }).then(response => response.json()).then(data => {
                if (data.success == true) {
                    setAlertMessage("Alimento actualizado con éxito")
                    setFormSubmitted(true)
                } else {
                    throw new Error()
                }
            }).catch(() => {
                setAlertMessage("Ocurrió un error al guardar el alimento")
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
                            <h1>Editar alimento</h1>
                            <CloseButton/>
                        </div>
                        <form ref={formRef} onSubmit={submitForm} className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <Input id="inputNombre" inputType="text" label="Nombre" defaultValue={jsonData.nombre}></Input>
                                <Input id="inputCalorias" inputType="number" label="Calorías" defaultValue={jsonData.calorias.toString()}></Input>
                                <div className="flex flex-row gap-3">
                                    <Input id="inputPorcion" inputType="number" label="Porción" defaultValue={"100"}></Input>
                                    <Select id="selectUnidad" defaultValue={jsonData.unidadId} label="Unidad">
                                        <option value={0}>Unidad</option>
                                        <option value={1}>g.</option>
                                        <option value={2}>mL.</option>
                                    </Select>
                                </div>
                            </div>
                            <Button btnType="submit" className="self-center">Guardar</Button>
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