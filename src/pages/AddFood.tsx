import { Button, CloseButton, InputUnit, Select } from '../components'
import { IonRouterLink, useIonRouter } from '@ionic/react'

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { UserContext } from '../App';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router';

    interface Food {
        id: number;
        nombre: string;
        unidad: string;
    }

export default function AddFood() {
    const {userData, setUserData} = React.useContext(UserContext);
    const [foodData, setFoodData] = React.useState(null);
    const retroceder = useIonRouter();
    useEffect(() => {
        if (foodData) return;
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/user/food/?id=' + userData.idUsuario, {
                method: 'GET'
            });
            const data = await response.json();
            setFoodData(data);
        }
        fetchData();
    }, [userData.idUsuario]);


    function renderFood() {
        console.log(foodData)
        let array = []
        if (!foodData) return null;
        return foodData.map((food: Food) => {
            return <option key={food.id} value={food.id}>{food.nombre}</option>        
        })
    }

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                { userData.idUsuario ? null : <Redirect to="/login" /> }
                <div className="flex w-full h-full flex-col">
                    <div className="flex flex-col gap-8 p-20 mx-auto">
                        <div className="flex justify-between items-center">
                            <h1>Selecionar alimento</h1>
                            <CloseButton />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Select>
                                <option value={0}>Seleccione alimento</option>
                                { userData.idUsuario ? renderFood() : null}
                            </Select>
                            <InputUnit className="" inputType="number" placeholder="Tamaño porción" unit="g/mL." />
                        </div>
                        <Button className="self-center" onClick={()=>retroceder.goBack()}>Agregar</Button>
                        <div className="flex flex-col gap-1 text-center">
                            <p>¿No encuentras tu alimento en la lista?</p>
                            <IonRouterLink routerLink="/food_create" routerDirection='forward' >
                                <a className="text-pink-500 text-lg font-semibold underline" href="">Añádelo aquí</a>
                            </IonRouterLink>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
