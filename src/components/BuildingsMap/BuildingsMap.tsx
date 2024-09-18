import { useState } from 'react';
import ReactMapGL, { Marker, ViewStateChangeEvent } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { HomeFilled } from '@ant-design/icons';

import { RootState } from '../../store';
import { selectBuildingById } from '../../features/buildingsSlice';
import { showBuildingModal } from '../../features/modalSlice';
import { MY_CITY_LOCATION } from '../../utils/appConstants';

import styles from './BuildingsMap.style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const BuildingsMap = () => {
  const dispatch = useDispatch();
  const buildings = useSelector(
    (state: RootState) => state.buildingsReducer.filteredBuildings
  );

  const [viewState, setViewState] = useState(MY_CITY_LOCATION);

  return (
    <ReactMapGL
      {...viewState}
      onMove={(event: ViewStateChangeEvent) => setViewState(event.viewState)}
      style={{
        width: '100%',
        height: '100vh',
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={`${process.env.REACT_APP_MAPBOX_STYLE}`}
    >
      {buildings.map(building => (
        <Marker
          key={building.id}
          latitude={building.coordinates.latitude}
          longitude={building.coordinates.longitude}
        >
          <Button
            className={styles.markerBtn}
            style={{ backgroundColor: 'transparent', border: 'none' }}
            onClick={() => {
              dispatch(showBuildingModal());
              dispatch(selectBuildingById(building.id));
            }}
            icon={
              <HomeFilled
                style={{ fontSize: '26px', color: `${building.color}` }}
              />
            }
          />
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default BuildingsMap;
