import { Box, FormControl, FormLabel, styled, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function FormTextField(props) {
  const { control, name, rules, label, ...rest } = props;
  return <Controller
    control={control}
    name={name}
    rules={rules}
    render={
      ({
         field: { onChange, onBlur, value },
         fieldState,
       }) =>
        <MaxFormControl error={fieldState.error !== undefined}>
          <MaxFormLabel required={Boolean(rules?.required ?? false)}
                         key={name}>{label}</MaxFormLabel>
          <MaxFormInput>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              error={fieldState.error !== undefined}
              helperText={fieldState.error?.message}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              {...rest}
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
