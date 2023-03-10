import {createSlice} from '@reduxjs/toolkit';

const initialState={
    characterList:[]
}

export const characterReducer=createSlice({
    name:'character',
    initialState,
    reducers:{
        setCharacterList:(state,action)=>{
            state.characterList=action.payload;
        }
    },
});

export const {setCharacterList}=characterReducer.actions;

export default characterReducer.reducer;