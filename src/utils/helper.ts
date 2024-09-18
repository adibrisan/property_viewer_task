import toast from 'react-hot-toast';

import { getGeoLocationCoordinatesURLPathForAddress } from './appConstants';

export const getCoordinatesForAddress = async (
  address: string
): Promise<{ latitude: number; longitude: number } | void> => {
  try {
    const response = await fetch(
      getGeoLocationCoordinatesURLPathForAddress(address)
    );
    if (!response.ok) {
      toast('No coordinates data were found for this address.', {
        icon: '🚫📊',
      });
    }
    const data = await response.json();

    if (data.features && data.features.length) {
      const { center } = data.features[0];
      const [longitude, latitude] = center;
      return { latitude, longitude };
    }
  } catch (error) {
    toast.error(
      'There was an internal error when trying to retrieve the coordinates.'
    );
  }
};
