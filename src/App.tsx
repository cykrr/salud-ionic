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
    setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import {Main, Login, Register, TermsConditions, Menu, Food, CreateFood, AddFood, AddExercise, Exercise} from './pages';
import {NavBar} from './components';
import { Switch } from 'react-router-dom';


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
import MainTabRoot from './pages/MainTabRoot';

setupIonicReact();

const App: React.FC = () => (

  <IonApp>
    <IonReactRouter>
        <Switch>
          <Route exact path="/"
            component={Main} />
          <Route path="/login"
            component={Login} />
          <Route path="/signup"
            component={Register} />
          <Route path="/terms_and_conditions"
            component={TermsConditions} />
          <Route path="/tabs"
            render={() => <MainTabRoot />}/>

        </Switch>
    </IonReactRouter>
  </IonApp>

);

export default App;
