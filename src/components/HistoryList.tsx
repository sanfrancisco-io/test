import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Table, TableProps } from 'antd';
import { IAircraftHistory } from '@/types/aircraft';
import dayjs from 'dayjs';

const HistoryList = () => {
  const { currentAircraft } = useAppSelector((state) => state.aircraft);

  if (!currentAircraft) return <div>Something went wrong!</div>;

  const columns: TableProps<IAircraftHistory>['columns'] = [
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => dayjs(record.date).format('DD/MM/YYYY hh:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'newStatus',
      key: 'status',
    },
  ];

  return (
    <Table
      bordered
      pagination={false}
      columns={columns}
      dataSource={currentAircraft.history}
      rowKey={(record) => record.date}
    />
  );
};

export default HistoryList;
