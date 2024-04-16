import {useHistory} from "react-router-dom"

export default function CloseButton() {
    const history = useHistory()
    return(
        <button className="w-6 h-6" onClick={()=>{history.goBack()}}>
            <img className="w-full h-full" src='src/assets/cerrar.png' alt=""/>
        </button>
    );
}