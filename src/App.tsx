import { Layout, Modal, Tabs, FloatButton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BuildingList from './components/BuildingList';
import BuildingsMap from './components/BuildingsMap/BuildingsMap';
import BuildingForm from './components/BuildingForm';
import { RootState } from './store';
import { closeBuildingModal, showBuildingModal } from './features/modalSlice';
import { setEditFormMode } from './features/formModeSlice';

import 'mapbox-gl/dist/mapbox-gl.css';

const { Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const isOpenBuildingModal = useSelector(
    (state: RootState) => state.modalReducer.isOpen
  );
  const isEditForm = useSelector(
    (state: RootState) => state.formModeReducer.isEditMode
  );
  return (
    <Layout>
      <FloatButton
        onClick={() => {
          dispatch(setEditFormMode(false));
          dispatch(showBuildingModal());
        }}
        icon={<PlusCircleOutlined />}
        type="primary"
      />
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
            editMode={isEditForm}
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
