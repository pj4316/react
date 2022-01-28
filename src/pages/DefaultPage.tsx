import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Alert, Box, Container, IconButton, Snackbar, styled, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import MenuList from '../components/MenuList';
import { root } from '../index';

interface DefaultPageProps {
  title: string,
  breadcrumbs: ReactNode,
  content?: ReactNode,
  additionalInfo?: {
    severity?:  'info' | 'warning' | 'success' | 'error',
    value: string
  }
}

const PageContainer = styled(Container)(() => ({
  position: 'fixed',
  width: '100%',
  height: '100%',
}));

interface MainBoxProps {
  left: number,
}

const MainBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MainBoxProps>(({ left }) => ({
  display: 'flex',
  position: 'fixed',
  flexDirection: 'column',
  left: left,
  width: `calc(100% - ${left}px)`,
  height: '100%',
}));

const MainHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  height: '80px',
  marginTop: 16,
  marginLeft: 16,
  marginRight: 16,
  padding: 16,
  borderRadius: 16,
  backgroundColor: theme.palette.primary[500],
  color: theme.palette.primary.contrastText,
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  height: '100%',
  margin: 16,
  padding: 16,
  borderRadius: 16,
  backgroundColor: theme.palette.primary[50],
  justifyContent: 'space-between',
}));

const BreadcrumbsBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

@observer
export default class DefaultPage extends Component<DefaultPageProps> {
  render(): ReactNode {
    const { title, breadcrumbs, content, additionalInfo, children } = this.props;
    const { globalConfigStore, firebaseSessionStore } = root;

    document.title = `Max\'s Page | ${title}`;

    return (
      firebaseSessionStore.user ? (
      <PageContainer>
        <MenuList/>
        <MainBox left={globalConfigStore.drawerWidth}>
          <MainHeader>
            <Typography variant={'h6'}>
              {title}
              {
                additionalInfo !== undefined
                  ? <IconButton
                    color={additionalInfo.severity ?? 'warning'}
                    onClick={() => globalConfigStore
                      .setAlert(
                        additionalInfo.value,
                        additionalInfo.severity ?? 'warning',
                        { vertical: 'top', horizontal: 'center' })
                    }>
                    <WarningAmberIcon/>
                  </IconButton>
                  : null
              }
            </Typography>
            <BreadcrumbsBox>{breadcrumbs}</BreadcrumbsBox>
          </MainHeader>
          <MainContent>{content} {children}</MainContent>
        </MainBox>
        {globalConfigStore.alertInfo ?
          (<Snackbar
            open={globalConfigStore.alertInfo.open}
            autoHideDuration={globalConfigStore.alertInfo.duration}
            onClose={globalConfigStore.alertInfo.onClose}
            anchorOrigin={globalConfigStore.alertInfo.anchorOrigin}
          >
            <Alert onClose={globalConfigStore.alertInfo.onClose} severity={globalConfigStore.alertInfo.severity}
                   sx={{ width: '100%' }}>
              {globalConfigStore.alertInfo.message}
            </Alert>
          </Snackbar>) : null}
      </PageContainer>) : (<Redirect to={'/sign-in'}/>)
    );
  }
}
