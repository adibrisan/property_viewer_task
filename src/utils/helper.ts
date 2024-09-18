import { getGeoLocationCoordinatesURLPathForAddress } from './appConstants';

export const getCoordinatesForAddress = async (address: string) => {
  try {
    const response = await fetch(
      getGeoLocationCoordinatesURLPathForAddress(address)
    );
    const data = await response.json();

    if (data.features && data.features.length) {
      const { center } = data.features[0];
      const [longitude, latitude] = center;
      console.log(
        'COORDINATES',
        'latitude: ',
        latitude,
        'longitude: ',
        longitude
      );
      return { latitude, longitude };
    } else {
      console.log('no results');
    }
  } catch (error) {
    console.log('error fetching');
  }
};
