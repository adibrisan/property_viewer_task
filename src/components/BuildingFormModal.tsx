import { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';

const { TextArea } = Input;
const { Option } = Select;

interface IBuildingFormModal {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const BuildingFormModal = ({
  open,
  handleOk,
  handleCancel,
}: IBuildingFormModal) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: building) => {
    console.log('Form submitted:', values);
    setVisible(false);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<building>) => {
    console.log('Form submission failed:', errorInfo);
  };
  return (
    <Modal open={open} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="name"
          label="Building Name"
          rules={[
            { required: true, message: 'Please input the building name' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="street"
          label="Street"
          rules={[{ required: true, message: 'Please input the street' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="number"
          label="Number"
          rules={[
            { required: true, message: 'Please input the building number' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="postalCode"
          label="Postal Code"
          rules={[{ required: true, message: 'Please input the postal code' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input the city' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please input the country' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please provide a description' }]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Latitude"
          name={['coordinates', 'latitude']}
          rules={[{ required: true, message: 'Please input the latitude' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Longitude"
          name={['coordinates', 'longitude']}
          rules={[{ required: true, message: 'Please input the longitude' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="color"
          label="Marker Color"
          rules={[{ required: true, message: 'Please select a marker color' }]}
        >
          <Select placeholder="Select a color">
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="green">Green</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="purple">Purple</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '10px' }}
          >
            Submit
          </Button>
          <Button onClick={() => setVisible(false)}>Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BuildingFormModal;
