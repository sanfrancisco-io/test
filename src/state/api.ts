import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAircraft, IAircraftParams, IAircraftPreview } from '@/types/aircraft';

export const aircraftApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  reducerPath: 'aircraftApi',
  tagTypes: ['Aircraft'],
  endpoints: (build) => ({
    getAircrafts: build.query<IAircraft[], IAircraftParams>({
      query: (params) => ({
        url: `aircrafts`,
        method: 'GET',
        params,
      }),
      providesTags: ['Aircraft'],
    }),
    createAircraft: build.mutation<void, IAircraftPreview>({
      query: (body) => ({
        url: `aircrafts`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Aircraft'],
    }),
    editAircraft: build.mutation<void, IAircraft>({
      query: (body) => {
        const { id, ...aircraft } = body;
        return {
          url: `aircrafts/${id}`,
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['Aircraft'],
    }),
    deleteAircraft: build.mutation<void, string>({
      query: (id) => ({
        url: `aircrafts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Aircraft'],
    }),
  }),
});

export const {
  useGetAircraftsQuery,
  useEditAircraftMutation,
  useCreateAircraftMutation,
  useDeleteAircraftMutation,
} = aircraftApi;
