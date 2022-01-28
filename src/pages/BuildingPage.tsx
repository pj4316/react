import { Box, Card, CardContent, CardMedia, styled, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Copyright } from '../components/Copyright';
import { cardBgColors } from '../components/MenuCard';
import logo from '../images/logo1.png';

@observer
export class BuildingPage extends Component {
  render(): ReactNode {
    document.title = 'Max\'s Page | building page';

    return (<HomeBox>
      <HomeMainBox>
        <MainHeader>
          <Typography variant={'h2'}> 죄송합니다. 🚧️ ️</Typography>
          <Typography variant={'h4'}> 열심히 페이지를 만들고 있습니다. </Typography>
          <p> 조금만 기다려주세요..!</p>
        </MainHeader>
        <MainContent>
          <ItemCard>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <CardMedia
                component="img"
                height="100"
                image={logo}
                sx={{ backgroundColor: cardBgColors[1] }}
                alt="logo"
              />
              <ItemCardContent>
                메인화면으로
              </ItemCardContent>
            </Link>
          </ItemCard>
        </MainContent>
      </HomeMainBox>
      <HomeTailBox><Copyright sx={{ mt: 8, mb: 4 }}/></HomeTailBox>
    </HomeBox>);
  }
}

const HomeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  flexDirection: 'column',
  width: '100%',
  top: '10%',
  height: '80%',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.primary[50],
}));

const HomeMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  left: '10%',
  width: '80%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary[50],
  flowGrow: 1,
}));

const MainHeader = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  width: '60%',
  alignItems: 'center',
  margin: 16,
}));

const MainContent = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 32,
}));

const HomeTailBox = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ItemCard = styled(Card)(() => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  width: 200,
  height: 144,
  borderRadius: 32,
  '&:hover': {
    filter: 'brightness(1.25)',
    transition: '0.1s',
  },
}));

const ItemCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontWeight: 'bold',
  fontSize: theme.typography[4],
  color: theme.palette.text.primary,
  gap: 8,
  padding: 4,
  paddingRight: 16,
}));
