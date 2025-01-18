'use client';

import styles from './page.module.css';
import { Button, Flex, Input, Modal, Spin, Table, Typography } from 'antd';
import { useState } from 'react';
import CreateAircraftForm from '@/components/CreateAircraftForm';
import {
  useCreateAircraftMutation,
  useDeleteAircraftMutation,
  useEditAircraftMutation,
  useGetAircraftsQuery,
} from '@/state/api';
import { IAircraft, IAircraftPreview } from '@/types/aircraft';
import EditAircraftForm from '@/components/EditAircraftForm';
import { useAppDispatch } from '@/lib/hooks';
import { setCurrentAircraft } from '@/state/slice/aircraftSlice';
import HistoryList from '@/components/HistoryList';
import useDebounce from '@/shared/useDebounce';
import dayjs from 'dayjs';

const initialQuery = {
  model_like: '',
  registrationNumber_like: '',
  year_like: '',
  status_like: '',
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [filterByQuery, setFilterByQuery] = useState(initialQuery);

  const dispatch = useAppDispatch();

  const [createAircraft] = useCreateAircraftMutation();
  const [updateAircraft] = useEditAircraftMutation();
  const [deleteAircraft] = useDeleteAircraftMutation();

  const debValue = useDebounce(filterByQuery, 500);

  const {
    data: aircraftsData,
    isError,
    isLoading,
  } = useGetAircraftsQuery(debValue);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (data: IAircraft) => {
    setIsEditModalOpen(true);
    dispatch(setCurrentAircraft(data));
  };

  const showHistoryModal = (data: IAircraft) => {
    setIsHistoryOpen(true);
    dispatch(setCurrentAircraft(data));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleHistoryCancel = () => {
    setIsHistoryOpen(false);
  };

  const onSaveAircraft = (data: IAircraftPreview) => {
    createAircraft(data);
    setIsModalOpen(false);
  };

  const onSaveEditAircraft = (data: IAircraft) => {
    updateAircraft(data);
    setIsEditModalOpen(false);
  };

  const handleDeleteAircraft = (data: IAircraft) => {
    deleteAircraft(data.id);
  };

  const onChangeQuery = (name: string, value: string) => {
    setFilterByQuery((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <Spin fullscreen spinning={isLoading} />;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button onClick={showModal} type="primary">
          Add aircraft
        </Button>
      </div>
      <div className={styles.headerFilter}>
        <Input
          placeholder="Search by Reg. number"
          onChange={(e) =>
            onChangeQuery('registrationNumber_like', e.target.value)
          }
        />
        <Input
          placeholder="Search by Model"
          onChange={(e) => onChangeQuery('model_like', e.target.value)}
        />
        <Input
          placeholder="Search by Year"
          onChange={(e) => onChangeQuery('year_like', e.target.value)}
        />
        <Input
          placeholder="Search by Status"
          onChange={(e) => onChangeQuery('status_like', e.target.value)}
        />
      </div>
      <Table<IAircraft>
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
              <Button onClick={() => handleDeleteAircraft(record)}>
                Delete
              </Button>
            </Flex>
          )}
        />
      </Table>
      <Modal
        footer={null}
        title="Create Aircraft"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <CreateAircraftForm onSave={onSaveAircraft} onCancel={handleCancel} />
      </Modal>
      <Modal
        destroyOnClose
        footer={null}
        title="Edit Aircraft"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
      >
        <EditAircraftForm
          onSave={onSaveEditAircraft}
          onCancel={handleEditCancel}
        />
      </Modal>
      <Modal
        destroyOnClose
        footer={null}
        title="Status history"
        open={isHistoryOpen}
        onCancel={handleHistoryCancel}
      >
        <HistoryList />
      </Modal>
    </div>
  );
}
