import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { closeBuildingModal } from '../features/modalSlice';
import { RootState } from '../store';

import BuildingForm from './BuildingForm';

const BuildingModal = () => {
  const dispatch = useDispatch();
  const isOpenBuildingModal = useSelector(
    (state: RootState) => state.modalReducer.isOpen
  );
  const isEditForm = useSelector(
    (state: RootState) => state.formModeReducer.isEditMode
  );

  return (
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
  );
};

export default BuildingModal;
