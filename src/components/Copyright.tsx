import { Link, Typography } from '@mui/material';

const CopyrightImpl = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright '}{new Date().getFullYear()}{'. '}
      <Link color="inherit" href="">
        Max Lee's Page
      </Link>{' all rights reserved.'}
    </Typography>
  );
};

export const Copyright = CopyrightImpl;
