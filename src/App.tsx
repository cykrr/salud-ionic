import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import TermsConditions from './pages/TermsConditions';
import Menu from './pages/Menu'
import Food from './pages/Food'
import CreateFood from './pages/CreateFood';
import AddFood from './pages/AddFood';
import AddExercise from './pages/AddExercise';
import Excercise from './pages/Excercise';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './global.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" 
               component={Main}/>
        <Route path="/login" 
               component={Login}/>
        <Route path="/signup" 
               component={Register}/>
        <Route path="/terms_and_conditions" 
               component={TermsConditions}/>
        <Route path="/menu" 
               component={Menu}/>
        <Route path="/add_food" 
               component={AddFood}/>
        <Route path="/add_excercise" 
               component={AddExercise}/>
        <Route path="/create_food" 
               component={CreateFood}/>
        <Route path="/food" 
               component={Food}/>
        <Route path="/excercise" 
               component={Excercise}/>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
