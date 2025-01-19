import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import useDebounce from '@/shared/useDebounce';
import { useDeleteAircraftMutation, useGetAircraftsQuery } from '@/state/api';
import { setCurrentAircraft } from '@/state/slice/aircraftSlice';
import { IAircraft } from '@/types/aircraft';
import { Button, Flex, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

interface IAircraftListProps {
  setIsEditModalOpen: (val: boolean) => void;
  setIsHistoryOpen: (val: boolean) => void;
}

const AircraftList = ({
  setIsEditModalOpen,
  setIsHistoryOpen,
}: IAircraftListProps) => {
  const { filterState } = useAppSelector((state) => state.aircraft);
  const dispatch = useAppDispatch();

  const [deleteAircraft] = useDeleteAircraftMutation();

  const debValue = useDebounce(filterState, 500);

  const {
    data: aircraftsData,
    isError,
    isLoading,
  } = useGetAircraftsQuery(debValue);

  const showEditModal = (data: IAircraft) => {
    setIsEditModalOpen(true);
    dispatch(setCurrentAircraft(data));
  };

  const showHistoryModal = (data: IAircraft) => {
    setIsHistoryOpen(true);
    dispatch(setCurrentAircraft(data));
  };

  const handleDeleteAircraft = (data: IAircraft) => {
    deleteAircraft(data.id);
  };

  if (isError) return <div>Something went wrong!</div>;

  return (
    <Table<IAircraft>
      loading={isLoading}
      pagination={false}
      bordered
      dataSource={aircraftsData}
      rowKey={(aircraft) => aircraft.id}
    >
      <Table.Column<IAircraft>
        key="registrationNumber"
        title="Registration number"
        dataIndex="registrationNumber"
      />
      <Table.Column<IAircraft> key="model" title="Model" dataIndex="model" />
      <Table.Column<IAircraft>
        key="year"
        title="Year"
        dataIndex="year"
        render={(_, record) => dayjs(record.year).format('DD-MM-YYYY')}
      />
      <Table.Column<IAircraft>
        key="status"
        title="Status"
        dataIndex="status"
        render={(_, record) => (
          <Flex align="center" gap={15}>
            <Typography>{record.status}</Typography>
            <Button onClick={() => showHistoryModal(record)}>
              Show history
            </Button>
          </Flex>
        )}
      />
      <Table.Column<IAircraft>
        key="action"
        title="Actions"
        render={(_, record) => (
          <Flex gap={15}>
            <Button onClick={() => showEditModal(record)}>Edit</Button>
            <Button onClick={() => handleDeleteAircraft(record)}>Delete</Button>
          </Flex>
        )}
      />
    </Table>
  );
};

export default AircraftList;
