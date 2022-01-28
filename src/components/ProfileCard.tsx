import { Avatar, Box, Card, CardContent, CardHeader, styled } from '@mui/material';

const ItemCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  borderColor: theme.palette.primary[800],
  borderWidth: '0.5ex',
}));

const ItemCardHeader = styled(CardHeader)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: 8,
}));

const ItemCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  gap: 8,
  padding: 4,
  paddingLeft: 16,
  paddingRight: 16,
}));

const ContentItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-between',
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
  title: string,
  userId: string,
  username?: string,
  displayName?: string,
  profileImage?: string,
}

export const ProfileCard = (prop: ProfileCardProps) => {
  return (<ItemCard>
    <ItemCardHeader
      avatar={
        <Avatar variant="rounded" src={prop.profileImage} sx={{ width: 56, height: 56 }}>
          프로필
        </Avatar>
      }
      title={prop.title}
      subheader={prop.userId}
    />
    <ItemCardContent>
      <ContentItem>
        <Box>유저 이름</Box>
        <Box>{prop.username}</Box>
      </ContentItem>
      <ContentItem>
        <Box>닉네임</Box>
        <Box>{prop.displayName}</Box>
      </ContentItem>
    </ItemCardContent>
  </ItemCard>);
};
