import ReactMapGL, { Marker } from 'react-map-gl';
import { useSelector } from 'react-redux';

import { RootState } from '../store';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapDisplay = () => {
  const buildings = useSelector(
    (state: RootState) => state.buildings.buildings
  );

  return (
    <ReactMapGL
      initialViewState={{
        latitude: 40.7128,
        longitude: -74.006,
        zoom: 10,
      }}
      style={{ width: '100%', height: '100vh' }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      latitude={40.7128}
      longitude={-74.006}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {buildings.map(building => (
        <Marker
          key={building.id}
          latitude={building.coordinates.latitude}
          longitude={building.coordinates.longitude}
          offset={[0, -10]}
        >
          <div
            style={{
              backgroundColor: building.color,
              padding: '10px',
              borderRadius: '50%',
            }}
          >
            {building.name}
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default MapDisplay;
