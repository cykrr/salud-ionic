import {Main} from '.'
import {IonNav} from '@ionic/react'
export default function MainTabs() {
    return <IonNav root={()=> <Main/>}/>
}