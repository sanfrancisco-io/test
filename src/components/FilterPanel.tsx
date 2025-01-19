import { useAppDispatch } from '@/lib/hooks';
import { setFilterState } from '@/state/slice/aircraftSlice';
import { Input } from 'antd';
import styles from '../app/page.module.css';

const FilterPanel = () => {
  const dispatch = useAppDispatch();

  const onChangeQuery = (name: string, value: string) => {
    dispatch(setFilterState({ name, value }));
  };

  return (
    <div className={styles.headerFilter}>
      <Input
        placeholder="Search by Reg. number"
        allowClear
        onChange={(e) =>
          onChangeQuery('registrationNumber_like', e.target.value)
        }
      />
      <Input
        allowClear
        placeholder="Search by Model"
        onChange={(e) => onChangeQuery('model_like', e.target.value)}
      />
      <Input
        allowClear
        placeholder="Search by Year"
        onChange={(e) => onChangeQuery('year_like', e.target.value)}
      />
      <Input
        allowClear
        placeholder="Search by Status"
        onChange={(e) => onChangeQuery('status_like', e.target.value)}
      />
    </div>
  );
};

export default FilterPanel;
