import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationList: [],
};

export const locationReducer = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationList: (state, action) => {
      state.locationList = action.payload;
    }
  },
});

export const { setLocationList } = locationReducer.actions;

export default locationReducer.reducer;
