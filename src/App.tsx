import { Layout, Tabs, Tooltip } from 'antd';

import BuildingList from './components/BuildingList';
import BuildingsMap from './components/BuildingsMap/BuildingsMap';
import AddBuildingButton from './components/AddBuildingButton';
import BuildingModal from './components/BuildingModal';

import 'mapbox-gl/dist/mapbox-gl.css';

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Tooltip title="Add a new building here">
        <AddBuildingButton />
      </Tooltip>
      <Content>
        <BuildingModal />
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
