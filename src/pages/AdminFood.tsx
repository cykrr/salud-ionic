import { IonPage, IonContent, IonFabButton, IonFab, IonIcon } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { API_URL, UserContext } from '../App';
import { add, colorPalette } from 'ionicons/icons';

interface Food {
    id: number;
    nombre: string;
    unidad: string;
}

export default function AdminFood() {
    const {userData, setUserData} = useContext(UserContext)!;
    const [foodData, setFoodData] = useState<Food[]>();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${API_URL}/food/get?id=` + userData.idUsuario, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            });
            const data = await response.json();
            setFoodData(data);
        }
        fetchData();
    }, [userData.idUsuario]);
    
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
                                    <div className="flex flex-row py-1.5">
                                        <div className="w-full justify-center">{item.nombre}</div>
                                        <div className="flex flex-row gap-2">
                                            <img className="w-5 h-5 cursor-pointer" src='src/assets/editar.png' alt=""/>
                                            <img className="w-5 h-5 cursor-pointer" src='src/assets/eliminar.png' alt=""/>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        </div>
                    </div>
                </div>       
            </IonContent>
        </IonPage>
    )
}