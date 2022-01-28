import { Box, Checkbox, Chip, FormControl, FormLabel, MenuItem, Select, styled } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function FormSelect(props) {
  const { control, name, rules, options, multiple, defaultValue } = props;
  return <Controller
    control={control}
    name={name}
    rules={rules}
    render={
      ({
         field,
         fieldState,
       }) =>
        <MaxFormControl error={fieldState.error !== undefined}>
          <MaxFormLabel required={Boolean(rules?.required ?? false)}
                         key={name}>{props.label}</MaxFormLabel>
          <MaxFormInput>
            <Select
              multiple={multiple ?? false}
              fullWidth
              variant="outlined"
              defaultValue={defaultValue}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {
                    multiple ? selected.map((it) => (
                      <Chip key={it} label={it}/>
                    )) : <Chip key={selected} label={selected}/>
                  }
                </Box>
              )}
              {...field}
            >
              {
                options.map((option) => {
                  return <MenuItem key={option} value={option}>
                    <Checkbox checked={field.value.indexOf(option) >= 0}/>
                    {option}
                  </MenuItem>;
                })
              }
            </Select>
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
