import { Button, DatePicker, Flex, Form, Input } from 'antd';
import { useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import {
  IAircraft,
  IAircraftHistory,
  IAircraftPreview,
} from '@/types/aircraft';
import dayjs from 'dayjs';

interface EditAircraftFormProps {
  onSave: (value: IAircraft) => void;
  onCancel: () => void;
}

interface IAircraftEdit {
  comment: string;
  model: string;
  registrationNumber: string;
  status: string;
  year: string;
}

const { TextArea } = Input;

const EditAircraftForm = ({ onSave, onCancel }: EditAircraftFormProps) => {
  const [form] = Form.useForm();

  const { currentAircraft } = useAppSelector((state) => state.aircraft);

  const onFinish = (value: IAircraftEdit) => {
    if (!currentAircraft) return;

    const { status, comment, ...otherValue } = value;

    const data: IAircraftPreview = {
      ...otherValue,
      status,
      history: [
        { newStatus: status, comment, date: dayjs().toISOString() },
        ...currentAircraft.history,
      ],
    };

    onSave({ ...data, id: currentAircraft.id });
    form.resetFields();
  };

  useEffect(() => {
    if (currentAircraft) {
      form.setFieldsValue({
        ...currentAircraft,
        year: dayjs(currentAircraft.year),
      });
    }
  }, [currentAircraft]);

  return (
    <Form<IAircraftEdit>
      name="editAircraft"
      onFinish={onFinish}
      form={form}
      layout="vertical"
    >
      <Form.Item<IAircraft>
        label="Registration number"
        name="registrationNumber"
        rules={[
          { required: true, message: 'Please input your registration number!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAircraft>
        label="model"
        name="model"
        rules={[{ required: true, message: 'Please input your model!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAircraft>
        label="year"
        name="year"
        rules={[{ required: true, message: 'Please input your year!' }]}
      >
        <DatePicker picker="year" />
      </Form.Item>

      <Form.Item<IAircraft>
        label="status"
        name="status"
        rules={[{ required: true, message: 'Please input your status!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAircraftHistory>
        label="comment"
        name="comment"
        rules={[{ required: true, message: 'Please input your comment!' }]}
      >
        <TextArea rows={2} />
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
export default EditAircraftForm;
