import { Button, DatePicker, Flex, Form, Input } from 'antd';
import { IAircraftPreview } from '@/types/aircraft';

interface CreateAircraftFormProps {
  onSave: (value: IAircraftPreview) => void;
  onCancel: () => void;
}

const CreateAircraftForm = ({ onSave, onCancel }: CreateAircraftFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (value: IAircraftPreview) => {
    const data = {
      ...value,
      history: [],
    };
    onSave(data);
    form.resetFields();
  };

  return (
    <Form
      name="createAircraft"
      onFinish={onFinish}
      form={form}
      layout="vertical"
    >
      <Form.Item<IAircraftPreview>
        label="Registration number"
        name="registrationNumber"
        rules={[
          { required: true, message: 'Please input your registration number!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAircraftPreview>
        label="model"
        name="model"
        rules={[{ required: true, message: 'Please input your model!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAircraftPreview>
        label="year"
        name="year"
        rules={[{ required: true, message: 'Please input your year!' }]}
      >
        <DatePicker picker="year" />
      </Form.Item>

      <Form.Item<IAircraftPreview>
        label="status"
        name="status"
        rules={[{ required: true, message: 'Please input your status!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Flex justify="space-between" align="center">
          <Button onClick={onCancel}>Close</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
export default CreateAircraftForm;
