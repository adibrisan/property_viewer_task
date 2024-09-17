/// <reference types="react-scripts" />

declare module '*.css';

type building = {
  id: number | string;
  name: string;
  street: string;
  number: string | number;
  postalCode: string;
  city: string;
  country: string;
  price: number;
  description: string;
  coordinates: { latitude: number; longitude: number };
  color: string;
};
