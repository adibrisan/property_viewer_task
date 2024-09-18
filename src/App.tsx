import { Layout, Modal, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import BuildingList from './components/BuildingList';
import BuildingsMap from './components/BuildingsMap/BuildingsMap';
import BuildingForm from './components/BuildingForm';
import { RootState } from './store';
import { closeBuildingModal } from './features/modalSlice';

import 'mapbox-gl/dist/mapbox-gl.css';

const { Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const isOpenBuildingModal = useSelector(
    (state: RootState) => state.modalReducer.isOpen
  );
  return (
    <Layout>
      <Content>
        <Modal
          open={isOpenBuildingModal}
          onCancel={() => dispatch(closeBuildingModal())}
          width="90%"
          footer={null}
          destroyOnClose={true}
          style={{ maxWidth: '600px' }}
        >
          <BuildingForm
            closeBuildingModal={() => dispatch(closeBuildingModal())}
          />
        </Modal>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Map View" key="1">
            <BuildingsMap />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Building List" key="2">
            <BuildingList />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default App;
