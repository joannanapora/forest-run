import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';



export const store = createStore(rootReducer, composeWithDevTools());

export const persistor = persistStore(store);