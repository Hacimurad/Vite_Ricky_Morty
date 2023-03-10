import {configureStore} from '@reduxjs/toolkit';
import  characterReducer  from './reducers/character';
import  locationReducer  from './reducers/location';

export const store=configureStore({
    reducer:{
        characters:characterReducer,
        locations:locationReducer,
    }
});