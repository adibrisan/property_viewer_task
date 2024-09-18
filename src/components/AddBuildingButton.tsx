import { FloatButton, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { setEditFormMode } from '../features/formModeSlice';
import { showBuildingModal } from '../features/modalSlice';

const AddBuildingButton = () => {
  const dispatch = useDispatch();
  return (
    <Tooltip title="Add a new building here">
      <FloatButton
        onClick={() => {
          dispatch(setEditFormMode(false));
          dispatch(showBuildingModal());
        }}
        icon={<PlusCircleOutlined />}
        type="primary"
      />
    </Tooltip>
  );
};

export default AddBuildingButton;
