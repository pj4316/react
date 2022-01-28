import { Box, Checkbox, FormControl, FormLabel, styled } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function FormCheckbox(props) {
  return <Controller
    control={props.control}
    name={props.name}
    rules={props.rules}
    render={
      ({
         field: { onChange, onBlur, value },
       }) =>
        <MaxFormControl>
          <MaxFormLabel required={Boolean(props.rules?.required ?? false)}
                         key={props.name}>{props.label}</MaxFormLabel>
          <MaxFormInput>
            <Checkbox
              value={value}
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched
              checked={Boolean(value ?? false)}
            />
          </MaxFormInput>
        </MaxFormControl>
    }/>;
}

const MaxFormControl = styled(FormControl)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  // justifyContent: 'space-between',
  gap: 4,
}));

const MaxFormLabel = styled(FormLabel)(() => ({
  display: 'flex',
  width: '25%',
}));

const MaxFormInput = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flexGrow: 1,
}));
