export interface IAircraft {
  id: string;
  registrationNumber: string;
  model: string;
  year: string;
  status: string;
  history: IAircraftHistory[];
}

export interface IAircraftHistory {
  date: string;
  comment: string;
  newStatus: string;
}

export interface IAircraftParams {
  registrationNumber_like: string;
  model_like: string;
  year_like: string;
  status_like: string;
}

export type IAircraftPreview = Omit<IAircraft, 'id'>;
