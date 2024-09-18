import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Alert,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { POSTAL_CODE_PATTERN } from '../utils/appConstants';
import { addBuilding, updateBuilding } from '../features/buildingsSlice';
import { getCoordinatesForAddress } from '../utils/helper';
import { RootState } from '../store';
import { setEditFormMode } from '../features/formModeSlice';

const { TextArea } = Input;
const { Option } = Select;

interface IBuildingForm {
  editMode?: boolean;
  closeBuildingModal: () => void;
}

const BuildingForm = ({
  editMode = true,
  closeBuildingModal,
}: IBuildingForm) => {
  const selectedBuilding = useSelector(
    (state: RootState) => state.buildingsReducer.selectedBuilding
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values: building) => {
    const coordinatesResult = await getCoordinatesForAddress(
      `${values.street} ${values.postalCode} ${values.city}`
    );
    if (coordinatesResult) {
      const { latitude, longitude } = coordinatesResult;
      values = { ...values, coordinates: { latitude, longitude } };
      if (editMode) {
        dispatch(updateBuilding({ ...values, id: selectedBuilding?.id ?? '' }));
      } else {
        dispatch(addBuilding({ ...values, id: uuidv4() }));
      }
    }
    form.resetFields();
    closeBuildingModal();
  };

  useEffect(() => {
    return () => {
      dispatch(setEditFormMode(true));
    };
  }, [dispatch]);

  if (!selectedBuilding && editMode) {
    return <Alert message="Error Text" type="error" closable={true} banner />;
  }

  return (
    <Form
      initialValues={editMode ? selectedBuilding : undefined}
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={30}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Building Name"
            rules={[
              {
                required: !editMode,
                message: 'Please input the building name',
              },
            ]}
          >
            <Input value={selectedBuilding?.name} />
          </Form.Item>

          <Form.Item
            name="street"
            label="Street"
            rules={[
              { required: !editMode, message: 'Please input the street' },
            ]}
          >
            <Input value={selectedBuilding?.street} />
          </Form.Item>

          <Form.Item
            name="number"
            label="Number"
            rules={[
              {
                required: !editMode,
                message: 'Please input the building number',
              },
            ]}
          >
            <InputNumber
              value={selectedBuilding?.number}
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="postalCode"
            label="Postal Code"
            rules={[
              { required: !editMode, message: 'Please input the postal code' },

              {
                pattern: POSTAL_CODE_PATTERN,
                message: 'Postal code must be a 6-digit number',
              },
            ]}
          >
            <Input value={selectedBuilding?.postalCode} />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[{ required: !editMode, message: 'Please input the city' }]}
          >
            <Input value={selectedBuilding?.city} />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              { required: !editMode, message: 'Please input the country' },
            ]}
          >
            <Input value={selectedBuilding?.country} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: !editMode, message: 'Please input the price' }]}
          >
            <InputNumber
              value={selectedBuilding?.price}
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: !editMode, message: 'Please provide a description' },
            ]}
          >
            <TextArea value={selectedBuilding?.description} rows={3} />
          </Form.Item>

          <Form.Item
            name="color"
            label="Marker Color"
            rules={[
              { required: !editMode, message: 'Please select a marker color' },
            ]}
          >
            <Select
              value={selectedBuilding?.color}
              placeholder="Select a color"
            >
              <Option value="red">Red</Option>
              <Option value="blue">Blue</Option>
              <Option value="green">Green</Option>
              <Option value="yellow">Yellow</Option>
              <Option value="purple">Purple</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: '10px' }}
        >
          Submit
        </Button>
        <Button onClick={closeBuildingModal}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default BuildingForm;
