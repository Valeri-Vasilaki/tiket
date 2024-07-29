import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransplantsFilter } from '../features/tickets/ticketsSlice';
import { RootState } from '../app/store';

const TransplantsFilter: React.FC = () => {
  const dispatch = useDispatch();
  const checkedTransplants = useSelector((state: RootState) => state.tickets.filters.transplants);

  const handleTransplantsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      dispatch(setTransplantsFilter([...checkedTransplants, value]));
    } else {
      dispatch(setTransplantsFilter(checkedTransplants.filter(t => t !== value)));
    }
  };

  return (
    <div className="filter row">
      <span>Пересадки</span>
      <label>
        <input type="checkbox" value="0" onChange={handleTransplantsChange} checked={checkedTransplants.includes('0')} />
        Без пересадок
      </label>
      <label>
        <input type="checkbox" value="1" onChange={handleTransplantsChange} checked={checkedTransplants.includes('1')} />
        1 пересадка
      </label>
      <label>
        <input type="checkbox" value="2" onChange={handleTransplantsChange} checked={checkedTransplants.includes('2')} />
        2 пересадки
      </label>
      <label>
        <input type="checkbox" value="3" onChange={handleTransplantsChange} checked={checkedTransplants.includes('3')} />
        3 пересадки
      </label>
    </div>
  );
};

export default TransplantsFilter;
