import { Box, styled, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { root } from '..';
import { MenuCard } from '../components/MenuCard';
import { Menus } from '../components/MenuList';

@observer
export class Home extends Component {
  render(): ReactNode {
    const { firebaseSessionStore } = root;
    document.title = 'Max\'s Page | Home';

    return firebaseSessionStore.user ? (<HomeBox>
      <HomeMainBox>
        <MainHeader>
          <Typography variant={'h3'}> Welcome to Max's Page π </Typography>
          <p>λ§₯μ€μ κ³΅κ°μ μ€μ  κ²μ νμν©λλ€. μνμλ ν­μ λλ¬μ£ΌμΈμ. </p>
        </MainHeader>
        <MainContent>
          {
            Menus.map((menu, index) => {
              return (<MenuCard
                key={menu.id}
                title={menu.title}
                link={menu.link}
                bgColorIndex={index}
                icon={menu.icon}
              />);
            })
          }
        </MainContent>
      </HomeMainBox>
    </HomeBox>) : (<Redirect to={'/sign-in'}/>);
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
  width: '50%',
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
