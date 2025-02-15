import styles from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '../../interfaces/person.interface.ts';
import { RootState } from '../../store/store.ts';
import {
  selectItem,
  unselectItem,
} from '../../store/slices/selectedItemsSlice.ts';

interface Props {
  person: Person;
  onPersonClick: (person: Person) => void;
}

export const Card = ({ person, onPersonClick }: Props) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  const handleCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      dispatch(
        selectItem({
          name: person.name,
          birth_year: person.birth_year,
          gender: person.gender,
          height: person.height,
          mass: person.mass,
          eye_color: person.eye_color,
          hair_color: person.hair_color,
          skin_color: person.skin_color,
        })
      );
    } else {
      dispatch(unselectItem(person.name));
    }
  };

  return (
    <div className={styles.card}>
      <input
        type="checkbox"
        checked={selectedItems.some((item) => item.name === person.name)}
        onChange={(e) => handleCheckboxChange(e.target.checked)}
      />
      <span
        data-testid={person.name}
        className={styles.person}
        onClick={() => onPersonClick(person)}
      >
        {person.name}
      </span>
    </div>
  );
};
