import { Autocomplete } from './Autocomplete.tsx';
import { Control, useController } from 'react-hook-form';
import { FormState } from '../../store/store';
import { Country } from '../../store/countriesSlice';

interface Props {
  options: Country[];
  control: Control<FormState>;
  name: 'country';
}

export const ControlledAutocomplete = ({
  control,
  name,
  options,
  ...props
}: Props) => {
  const { field } = useController({ name, control });

  return (
    <Autocomplete
      {...props}
      name={name}
      onChange={field.onChange}
      options={options}
    />
  );
};
