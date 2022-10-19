import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Upload,
} from 'antd';
import Flex from 'components/shared-components/Flex';
import { UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const history = useHistory();
  const { selectedUser } = useSelector((state) => state.user);

  const [state, setState] = useState({
    avatarUrl: '/img/avatars/thumb-6.jpg',
    name: selectedUser?.name || 'Jhon',
    email: selectedUser?.email || 'Jhon@gmail.com',
    username: selectedUser?.username || 'JhonSnow921',
    dateOfBirth: null,
    phoneNumber: selectedUser?.phone || '9941 192',
    website: selectedUser?.website || 'webpage',
    address: selectedUser?.address?.street || 'default',
    city: selectedUser?.address?.city || 'default',
    postcode: selectedUser?.address?.zipcode || 'default',
  });

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = async (values) => {
    const key = 'updatable';
    await message.loading({ content: 'Updating...', key });
    setTimeout(() => {
      setState({
        ...values,
      });
      message.success({ content: 'Done!', key, duration: 1 });
    }, 1000);
    history.push('/app/clients/list');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onRemoveAvater = () => {
    setState((prev) => ({
      ...prev,
      avatarUrl: '',
    }));
  };

  return (
    <div>
      <Flex
        alignItems='center'
        mobileFlex={false}
        className='text-center text-md-left'
      >
        <Avatar size={90} src={state.avatarUrl} icon={<UserOutlined />} />
        <div className='ml-md-3 mt-md-0 mt-3'>
          <Upload {...uploadProps} showUploadList={false}>
            <Button type='primary'>Change Avatar</Button>
          </Upload>
          <Button className='ml-2' onClick={onRemoveAvater}>
            Remove
          </Button>
        </div>
      </Flex>
      <div className='mt-4'>
        <Form
          name='basic'
          initialValues={{
            ...state,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label='Name'
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label='Username'
                    name='username'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Please enter a valid email!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='Date of Birth' name='dateOfBirth'>
                    <DatePicker className='w-100' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='Phone Number' name='phoneNumber'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='Website' name='website'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item label='Address' name='address'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='City' name='city'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='Post code' name='postcode'>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type='primary' htmlType='submit'>
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
