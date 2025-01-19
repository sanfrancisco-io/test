import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAircraft } from '@/types/aircraft';
import { InitialStateTypes } from '../types';

const initialState: InitialStateTypes = {
  currentAircraft: null,
  filterState: {
    model_like: '',
    registrationNumber_like: '',
    status_like: '',
    year_like: '',
  },
};

export const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {
    setCurrentAircraft: (state, action: PayloadAction<IAircraft>) => {
      state.currentAircraft = action.payload;
    },
    setFilterState: (
      state,
      action: PayloadAction<{ name: string; value: string }>,
    ) => {
      state.filterState = {
        ...state.filterState,
        [action.payload.name]: action.payload.value,
      };
    },
  },
});

export const { setCurrentAircraft, setFilterState } = aircraftSlice.actions;

export default aircraftSlice.reducer;
