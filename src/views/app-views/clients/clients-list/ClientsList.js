import { Avatar, Button, Card, Table, Tooltip, Spin } from 'antd';
import Flex from 'components/shared-components/Flex';
import {
  EyeOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUser } from 'redux/actions/User';
import { useHistory } from 'react-router-dom';

const antIcon = (size) => <LoadingOutlined style={{ fontSize: size }} spin />;

const ClientsList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userList, loading, error } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState({
    loading: false,
    id: null,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  const deleteUser = (id) => {
    setDeleteLoader({ loading: true, id });
    setTimeout(() => {
      setUsers((prev) => prev.filter((item) => item.id !== id));
      setDeleteLoader({ loading: false, id: null });
    }, 1000);
  };

  const viewProfileDetails = (profile) => {
    dispatch(selectUser(profile));
    history.push(`/app/clients/settings/${profile.id}`);
  };

  const tableColumns = [
    {
      title: 'User',
      dataIndex: 'name',
      render: (_, record) => (
        <div className='d-flex align-items-center'>
          <Avatar size={40} src={record?.image} name={record?.username} />
          <Flex
            justifyContent='between'
            flexDirection='column'
            mobileFlex={false}
          >
            <span className='ml-2 font-weight-semibold'>
              {record?.username}
            </span>
            <span className='ml-2 opacity-0-6'>{record?.email}</span>
          </Flex>
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.username.toLowerCase();
          b = b.username.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: 'Suite',
      dataIndex: 'suite',
      render: (_, record) => {
        return <span>{record?.address?.suite}</span>;
      },
      sorter: {
        compare: (a, b) => a.address.suite.localeCompare(b.address.suite),
      },
    },
    {
      title: 'Company',
      dataIndex: 'company',
      render: (_, data) => <span>{data?.company?.name}</span>,
      sorter: {
        compare: (a, b) => a.company.name.localeCompare(b.company.name),
      },
    },
    {
      title: 'Street',
      dataIndex: 'street',
      render: (_, data) => <span>{data?.address?.city}</span>,
      sorter: {
        compare: (a, b) => a.address.city.localeCompare(b.address.city),
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className='text-right'>
          <Tooltip title='View'>
            <Button
              type='primary'
              className='mr-2'
              icon={<EyeOutlined />}
              onClick={() => viewProfileDetails(elm)}
              size='small'
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Button
              danger
              icon={
                deleteLoader.id === elm.id ? (
                  <Spin indicator={antIcon(24)} />
                ) : (
                  <DeleteOutlined />
                )
              }
              disabled={deleteLoader.id === elm.id && deleteLoader.loading}
              onClick={() => deleteUser(elm.id)}
              size='small'
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <Flex alignItems='center' justifyContent='center'>
        <Spin indicator={antIcon(44)} />
      </Flex>
    );
  }

  return (
    <div>
      <Card bodyStyle={{ padding: '0px' }}>
        <Table
          columns={tableColumns}
          dataSource={!!users.length ? users : []}
          rowKey='id'
        />
      </Card>
    </div>
  );
};

export default ClientsList;
