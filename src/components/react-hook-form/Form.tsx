import { DialogActions, DialogContent } from '@mui/material';
import * as _ from 'lodash';
import React from 'react';

export default function Form(props: { sx?: any, methods: any, children: any, onSubmit: any, onError: any }) {
  const { control, handleSubmit } = props.methods;

  return (
    <form onSubmit={handleSubmit(props.onSubmit, props.onError)}>
      <DialogContent sx={props.sx ?? DefaultDialogContentStyle}>
        {React.Children.map(props.children, child => {
          if (_.isNil(child)) return;
          return child.props.name
            ? React.createElement(child.type, {
              ...{
                ...child.props,
                control,
                key: child.props.name,
              },
            }) : null;
        })}
      </DialogContent>
      <DialogActions>
        {React.Children.map(props.children, child => {
          if (_.isNil(child)) return;
          return child.props.name
            ? null : child;
        })}
      </DialogActions>
    </form>

  );
}

const DefaultDialogContentStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: 4,
  gap: 2,
};
