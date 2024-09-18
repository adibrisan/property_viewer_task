export const POSTAL_CODE_PATTERN = /^[0-9]{6}$/;

export const getGeoLocationCoordinatesURLPathForAddress = (address: string) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
