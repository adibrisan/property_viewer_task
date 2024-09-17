/// <reference types="react-scripts" />

type building = {
  id: number;
  name: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  country: string;
  price: number;
  description: string;
  coordinates: { latitude: number; longitude: number };
  color: string;
};
