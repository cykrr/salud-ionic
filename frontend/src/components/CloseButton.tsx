import {useIonRouter} from '@ionic/react';
export default function CloseButton() {
    const ir = useIonRouter();
    return(
        <button className="w-5 h-5" onClick={()=>{ir.goBack()}}>
            <img className="w-full h-full" src='assets/cerrar.png' alt=""/>
        </button>
    );
}