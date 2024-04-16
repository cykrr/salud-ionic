import {useIonRouter} from '@ionic/react';
export default function CloseButton() {
    const ir = useIonRouter();
    return(
        <button className="w-6 h-6" onClick={()=>{ir.goBack()}}>
            <img className="w-full h-full" src='src/assets/cerrar.png' alt=""/>
        </button>
    );
}