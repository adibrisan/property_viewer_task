import { List } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from '../store';

const BuildingList = () => {
  const buildings = useSelector(
    (state: RootState) => state.buildings.buildings
  );

  return (
    <List
      dataSource={buildings}
      renderItem={building => (
        <List.Item>
          <List.Item.Meta
            title={building.name}
            description={`${building.street}, ${building.number}, ${building.city}, ${building.country}`}
          />
          <div>
            Coordinates: {building.coordinates.latitude},{' '}
            {building.coordinates.longitude}
          </div>
          <div>Price: {building.price}</div>
        </List.Item>
      )}
    />
  );
};

export default BuildingList;
