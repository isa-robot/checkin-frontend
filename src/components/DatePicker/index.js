import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { useField } from '@rocketseat/unform';

registerLocale('pt', pt);

export default function DatePicker({
  name,
  dateFormat,
  minDate,
  initialValue,
  ...props
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        dateFormat={dateFormat}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        minDate={minDate}
        locale="pt"
        {...props}
      />
      {error && <span>{error}</span>}
    </>
  );
}
