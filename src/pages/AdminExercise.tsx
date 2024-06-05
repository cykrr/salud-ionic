import { IonPage, IonContent, IonAlert } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { API_URL, UserContext } from '../App';
import { useHistory } from 'react-router';

export interface Exercise {
    id: number;
    nombre: string;
    calorias: number;
}

export default function AdminFood() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [exerciseData, setExerciseData] = useState<Exercise[]>();
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [currentExercise, setCurrentExercise] = useState<Exercise>();
    const [success, setSuccess] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${API_URL}/exercise/get`, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            });
            const data = await response.json();
            setExerciseData(data);
        }
        fetchData();
    }, [userData.idUsuario]);

    function editExercise(exercise: Exercise) {
        history.push(`/exercise_edit?data=${JSON.stringify(exercise)}`)
    }

    async function deleteExercise(exercise: Exercise) {
        await fetch(`${API_URL}/exercise/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            body: new URLSearchParams({
                'idEjercicio': exercise.id.toString(),
            })
        }).then(response => response.json()).then(data => {
            if (data.success == true) {
                setAlertMessage(`Ejercicio ${exercise.nombre} eliminado con éxito`)
                setSuccess(true)

                if(exerciseData) {
                    const index = exerciseData.indexOf(exercise, 0);
                    if (index > -1) {
                        exerciseData.splice(index, 1);
                    }
                }
            } else {
                throw new Error()
            }
        }).catch(() => {
            setAlertMessage("Ocurrió un error al eliminar el ejercicio")
            setSuccess(false)
        }).finally(()=>{
            setShowAlert(true)
        })
    }

    function confirmDelete(exercise: Exercise) {
        setCurrentExercise(exercise)
        setShowConfirm(true)
    }
    
    return (
        <IonPage>
            <IonContent>
                <div className="flex flex-col w-full h-full items-center">
                    <div className="flex flex-col gap-5 p-10 w-full max-w-screen-sm">
                        <h1>Ejercicios registrados</h1>
                        <div className="flex flex-col">
                        {exerciseData && (
                            <>
                                {exerciseData.map((item, index) => (
                                    <div className="flex flex-row py-1.5" key={item.id}>
                                        <div className="w-full justify-center">{item.nombre}</div>
                                        <div className="flex flex-row gap-2">
                                            <img className="w-5 h-5 cursor-pointer" src='src/assets/editar.png' onClick={() => editExercise(item)} alt=""/>
                                            <img className="w-5 h-5 cursor-pointer" src='src/assets/eliminar.png' onClick={() => confirmDelete(item)} alt=""/>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        <IonAlert
                            isOpen={showAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header={success? "Éxito" : 'Error'}
                            message={alertMessage}
                            buttons={['OK']}
                        />
                        <IonAlert
                            isOpen={showConfirm}
                            onDidDismiss={() => setShowConfirm(false)}
                            header="Eliminar ejercicio"
                            message={`¿Desea eliminar el ejercicio ${currentExercise?.nombre}?`}
                            buttons={[
                                {
                                    text: 'No',
                                    role: 'cancel',
                                },
                                {
                                    text: 'Sí',
                                    handler: () => {
                                        {deleteExercise(currentExercise!)}
                                    }
                                }
                            ]}
                        />
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}