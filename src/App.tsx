import { Layout, Tabs } from 'antd';

import BuildingList from './components/BuildingList';
import BuildingsMap from './components/BuildingsMap/BuildingsMap';

import 'mapbox-gl/dist/mapbox-gl.css';

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Content>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Building List" key="2">
            <BuildingList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Map View" key="3">
            <BuildingsMap />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default App;
