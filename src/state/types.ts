import { IAircraft } from '@/types/aircraft';

interface IFilterState {
  model_like: string;
  registrationNumber_like: string;
  year_like: string;
  status_like: string;
}

export interface InitialStateTypes {
  currentAircraft: IAircraft | null;
  filterState: IFilterState;
}
