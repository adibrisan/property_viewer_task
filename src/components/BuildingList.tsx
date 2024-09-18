import { Row, Col, Card, List, Typography, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

import { RootState } from '../store';
import { setBuildingById } from '../features/buildingsSlice';
import { showBuildingModal } from '../features/modalSlice';

const { Text } = Typography;

const BuildingList = () => {
  const dispatch = useDispatch();
  const buildings = useSelector(
    (state: RootState) => state.buildingsReducer.filteredBuildings
  );

  return (
    <List
      dataSource={buildings}
      renderItem={building => (
        <List.Item
          style={{ padding: '20px' }}
          extra={
            <EditOutlined
              style={{ fontSize: '26px', cursor: 'pointer' }}
              onClick={() => {
                dispatch(setBuildingById(building.id));
                dispatch(showBuildingModal());
              }}
            />
          }
        >
          <Card style={{ width: '100%', marginRight: '20px' }}>
            <Row style={{ width: '100%' }} align="middle">
              <Col span={12}>
                <Card.Grid style={{ width: '80%' }}>
                  <List.Item.Meta
                    title={building.name}
                    description={`${building.street}, ${building.number}, ${building.city}, ${building.country}`}
                  />
                </Card.Grid>
              </Col>
              <Col span={12}>
                <Card.Grid style={{ width: '80%' }}>
                  <Space>
                    <Text italic>
                      Coordinates: lat:{' '}
                      {building.coordinates.latitude.toFixed(3)}, lng:{' '}
                      {building.coordinates.longitude.toFixed(3)}
                    </Text>
                    <Text>Price: {building.price}</Text>
                  </Space>
                </Card.Grid>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default BuildingList;
