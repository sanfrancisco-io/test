'use client';

import styles from './page.module.css';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import CreateAircraftForm from '@/components/CreateAircraftForm';
import {
  useCreateAircraftMutation,
  useEditAircraftMutation,
} from '@/state/api';
import { IAircraft, IAircraftPreview } from '@/types/aircraft';
import EditAircraftForm from '@/components/EditAircraftForm';
import HistoryList from '@/components/HistoryList';
import FilterPanel from '@/components/FilterPanel';
import AircraftList from '@/components/AircraftList';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [createAircraft] = useCreateAircraftMutation();
  const [updateAircraft] = useEditAircraftMutation();

  const showModal = () => {
    setIsModalOpen(true);
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button onClick={showModal} type="primary">
          Add aircraft
        </Button>
      </div>
      <FilterPanel />
      <AircraftList
        setIsEditModalOpen={setIsEditModalOpen}
        setIsHistoryOpen={setIsHistoryOpen}
      />
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
