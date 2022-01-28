import { Box, FormControl, FormLabel, styled, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function FormNumber(props) {
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
              type={'number'}
              value={value ?? 0}
              /**
               * https://mui.com/api/input
               * function(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
               event: The event source of the callback. You can pull out the new value by accessing event.target.value (string).
               */
              onChange={(e) => onChange(Number(e.target.value))}
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
