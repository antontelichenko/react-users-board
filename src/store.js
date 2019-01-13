import {createStore, combineReducers, compose} from 'redux'
import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
//Reducers
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'
//@todo

const firebaseConfig= {
    apiKey: "AIzaSyAVCmCXky_DUt2a7k3RmYrHdwOGECdCUV0",
    authDomain: "cmreact-877ed.firebaseapp.com",
    databaseURL: "https://cmreact-877ed.firebaseio.com",
    projectId: "cmreact-877ed",
    storageBucket: "cmreact-877ed.appspot.com",
    messagingSenderId: "1010770583751"
};

//react-redux-firebase-config
const rrfConfig={
    userProfile:'users',
    useFirestoreForProfile:true
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
    firebase:firebaseReducer,
    firestore:firestoreReducer,
    notify:notifyReducer,
    settings:settingsReducer

});

if(localStorage.getItem('settings')== null){
    const defaultSettings={
        disableBalanceOnAdd:true,
        disableBalanceOnEdit:false,
        allowRegistration:false
    }

    localStorage.setItem('settings', JSON.stringify(defaultSettings));


}


//Create initial state
const initialState={settings: JSON.parse(localStorage.getItem('settings'))};

//Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState, 
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;