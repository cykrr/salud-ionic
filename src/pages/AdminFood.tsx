import { IonPage, IonContent, IonAlert } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { API_URL, UserContext, updateToken } from '../App';
import { useHistory } from 'react-router';

export interface Food {
    id: number;
    nombre: string;
    calorias: number;
    unidad: string;
    unidadId: number;
}

export default function AdminFood() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [foodData, setFoodData] = useState<Food[]>();
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [currentFood, setCurrentFood] = useState<Food>();
    const [success, setSuccess] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${API_URL}/food?id=` + userData.idUsuario, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            });

            if (response.status == 401) {
                updateToken(setUserData, '');
                return;
            }
            updateToken(setUserData, response.headers.get("Token")!)
            
            const data = await response.json();
            setFoodData(data);
        }
        fetchData();
    }, [userData.idUsuario]);

    async function editFood(food: Food) {
        history.push(`/food_edit?data=${JSON.stringify(food)}`)
    }

    async function deleteFood(food: Food) {
        await fetch(`${API_URL}/food`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            body: new URLSearchParams({
                'idAlimento': food.id.toString(),
            })
        }).then(async response => {
            if (response.status == 401) {
                updateToken(setUserData, '');
                return;
            }
            updateToken(setUserData, response.headers.get("Token")!)

            const data : any = await response.json()
            if (data.success == true) {
                setAlertMessage(`Alimento ${food.nombre} eliminado con éxito`)
                setSuccess(true)
                setShowAlert(true)

                if(foodData) {
                    const index = foodData.indexOf(food, 0);
                    if (index > -1) {
                        foodData.splice(index, 1);
                    }
                }
            } else {
                throw new Error()
            }
        }).catch(() => {
            setAlertMessage("Ocurrió un error al eliminar el alimento")
            setSuccess(false)
            setShowAlert(true)
        })
    }

    function confirmDelete(food: Food) {
        setCurrentFood(food)
        setShowConfirm(true)
    }
    
    return (
        <IonPage>
            <IonContent>
                <div className="flex flex-col w-full h-full items-center">
                    <div className="flex flex-col gap-5 p-10 w-full max-w-screen-sm">
                        <h1>Alimentos registrados</h1>
                        <div className="flex flex-col">
                        {foodData && (
                            <>
                                {foodData.map((item, index) => (
                                    <div className="flex flex-row py-1.5" key={item.id}>
                                        <div className="w-full justify-center">{item.nombre}</div>
                                        <div className="flex flex-row gap-2">
                                            <img className="w-5 h-5 cursor-pointer" src='src/assets/editar.png' onClick={() => editFood(item)} alt=""/>
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
                            header="Eliminar alimento"
                            message={`¿Desea eliminar el alimento ${currentFood?.nombre}?`}
                            buttons={[
                                {
                                    text: 'No',
                                    role: 'cancel',
                                },
                                {
                                    text: 'Sí',
                                    handler: () => {
                                        {deleteFood(currentFood!)}
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