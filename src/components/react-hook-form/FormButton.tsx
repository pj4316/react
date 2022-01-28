import { Button } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function FormButton(props) {
  const { control, variant, color, children, ...rest } = props;
  return <Controller
    control={control}
    name={'form-button'}
    render={
      () =>
        <Button
          color={color ?? 'default'}
          variant={variant ?? 'contained'}
          {...rest}
        >
          {children}
        </Button>
    }/>;
}
