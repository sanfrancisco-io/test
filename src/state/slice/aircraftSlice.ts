import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAircraft } from '@/types/aircraft';

interface InitialStateTypes {
  currentAircraft: IAircraft | null;
}

const initialState: InitialStateTypes = {
  currentAircraft: null,
};

export const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {
    setCurrentAircraft: (state, action: PayloadAction<IAircraft>) => {
      state.currentAircraft = action.payload;
    },
  },
});

export const { setCurrentAircraft } = aircraftSlice.actions;

export default aircraftSlice.reducer;
