import { Typography, Avatar, Box, Button, Card, CardContent, CardHeader, styled, Tooltip } from '@mui/material';

const ItemCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  height: 80,
  minHeight: 80,
  padding: 8,
  paddingLeft: 16,
  gap: 16,
}));

const ContentItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingLeft: 4,
}));

export const cardBgColors = [
  'rgb(243,150,41)',
  'rgb(98,196,9)',
  'rgb(17,199,133)',
  'rgb(15,112,224)',
  'rgb(132,41,243)',
  'rgb(246,30,30)',
];

export interface ProfileCardProps {
  email?: string,
  onLogout: () => void
}

export const SessionCard = (prop: ProfileCardProps) => {
  const { email, onLogout } = prop;
  return email !== undefined ?
    <ItemCard>
      <Tooltip title={`로그인 유저 정보 : ${email.split('@')[0]}`} arrow>
        <Avatar sx={{ width: 48, height: 48, bgcolor: cardBgColors[4] }}>
          {email[0].toUpperCase()}
        </Avatar>
      </Tooltip>
      <ContentItem>
        <Typography>{email.split('@')[0]}</Typography>
        <Button variant={'outlined'} size={'small'} onClick={onLogout}>logout</Button>
      </ContentItem>
    </ItemCard> : null;
};
