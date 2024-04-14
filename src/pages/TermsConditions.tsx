import { IonPage, IonToolbar, IonTitle, IonHeader, IonContent } from '@ionic/react';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';


export default function TermsConditions() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Términos y Condiciones</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex w-full h-full flex-col p-20 space-y-10">
                    <h1>Términos y Condiciones</h1>
                    <div className="flex w-full flex-col space-y-5 overflow-y-auto pr-5">
                        <h2>Aceptación de términos y condiciones</h2>
                        <p>Al acceder y utilizar la aplicación móvil, aceptas cumplir y estar sujeto a estos términos y condiciones de uso. Si no estás de acuerdo con alguno de estos términos, por favor no utilices la aplicación.</p>
                        <h2>Uso de la aplicación</h2>
                        <p>La aplicación está destinada únicamente para uso personal y no comercial. No debes utilizar esta aplicación de ninguna manera que pueda ser perjudicial para otros usuarios o para el funcionamiento de la aplicación misma.</p>
                        <h2>Responsabilidad</h2>
                        <p>La información proporcionada por la aplicación se ofrece únicamente con fines informativos y no debe considerarse asesoramiento médico. Consulta a un profesional de la salud antes de comenzar cualquier régimen de alimentación o ejercicio físico.</p>
                        <h2>Propiedad intelectual</h2>
                        <p>Todos los derechos de propiedad intelectual relacionados con la aplicación, incluidos los derechos de autor, marcas comerciales y derechos de diseño, son propiedad del titular de la aplicación o de sus licenciantes.</p>
                        <h2>Modificaciones</h2>
                        <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier modificación entrará en vigor inmediatamente después de su publicación en la aplicación. Se te notificará sobre cualquier cambio significativo en los términos y condiciones.</p>
                    </div>
                    <div className="flex w-full flex-row justify-center space-x-5">
                        <LinkButton href="/menu">Aceptar</LinkButton>
                        <LinkButton href="/signin">Rechazar</LinkButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}