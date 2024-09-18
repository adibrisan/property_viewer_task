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
import { useDispatch } from 'react-redux';

import { POSTAL_CODE_PATTERN } from '../utils/appConstants';
import { updateBuilding } from '../features/buildingsSlice';
import { getCoordinatesForAddress } from '../utils/helper';

const { TextArea } = Input;
const { Option } = Select;

interface IBuildingForm {
  selectedBuilding?: building;
  setOpen: (open: boolean) => void;
  editMode?: boolean;
}

const BuildingForm = ({
  selectedBuilding,
  setOpen,
  editMode = false,
}: IBuildingForm) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: building) => {
    console.log(values);
    dispatch(updateBuilding({ ...values, id: selectedBuilding?.id ?? '' }));
    form.resetFields();
    setOpen(false);
  };

  getCoordinatesForAddress('Iulius Mall Timisoara');

  if (!selectedBuilding && editMode) {
    return <Alert message="Error Text" type="error" closable={true} banner />;
  }

  return (
    <Form
      initialValues={selectedBuilding}
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
                required: editMode,
                message: 'Please input the building name',
              },
            ]}
          >
            <Input value={selectedBuilding?.name} />
          </Form.Item>

          <Form.Item
            name="street"
            label="Street"
            rules={[{ required: editMode, message: 'Please input the street' }]}
          >
            <Input value={selectedBuilding?.street} />
          </Form.Item>

          <Form.Item
            name="number"
            label="Number"
            rules={[
              {
                required: editMode,
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
              { required: editMode, message: 'Please input the postal code' },

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
            rules={[{ required: editMode, message: 'Please input the city' }]}
          >
            <Input value={selectedBuilding?.city} />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              { required: editMode, message: 'Please input the country' },
            ]}
          >
            <Input value={selectedBuilding?.country} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: editMode, message: 'Please input the price' }]}
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
              { required: editMode, message: 'Please provide a description' },
            ]}
          >
            <TextArea value={selectedBuilding?.description} rows={3} />
          </Form.Item>

          <Form.Item
            label="Latitude"
            name={['coordinates', 'latitude']}
            rules={[
              { required: editMode, message: 'Please input the latitude' },
            ]}
          >
            <InputNumber
              value={selectedBuilding?.coordinates.latitude}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="Longitude"
            name={['coordinates', 'longitude']}
            rules={[
              { required: editMode, message: 'Please input the longitude' },
            ]}
          >
            <InputNumber
              value={selectedBuilding?.coordinates.longitude}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="color"
            label="Marker Color"
            rules={[
              { required: editMode, message: 'Please select a marker color' },
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
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default BuildingForm;
