import { configureStore } from '@reduxjs/toolkit';
import { aircraftApi } from '@/state/api';
import aircraftSlice from './slice/aircraftSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      aircraft: aircraftSlice,
      [aircraftApi.reducerPath]: aircraftApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(aircraftApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
