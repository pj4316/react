import {
  BugReportRounded,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  VideogameAsset,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { root } from '..';
import maxAvatar from '../images/max-avatar.png';
import { ContentItems } from '../pages/contents';
import { SessionCard } from './SessionCard';

const versionChip = <Chip label={`v${process.env.version}`} color="warning" size="small" variant="outlined"/>;
const serverInfoChip = process.env.NODE_ENV === 'production'
  ? <Chip label={`상용`} color="warning" size="small" variant="outlined"/>
  : <Chip label={`개발`} size="small" variant="outlined"/>;

export type MenuItem = {
  id: number | string,
  title: string,
  icon: any,
  link: string,
  image?: string,
  items?: MenuItem[],
}

export const Menus: MenuItem[] = [
  {
    id: 1,
    title: '콘텐츠 관리',
    icon: VideogameAsset,
    link: '/contents',
    items: ContentItems,
  },
];

const MenuListContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
}));

const MenuHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  height: '80px',
  paddingLeft: 16,
  paddingTop: 8,
  gap: 8,
}));

const MenuTail = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 8,
}));

const MenuItemList = styled(List)(() => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  gap: 8,
}));

const MenuItem = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary[50],
  },
}));

const MenuSubItemList = styled(List)(() => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: 4,
}));

const MenuSubItem = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: 0,
  '&:hover': {
    backgroundColor: theme.palette.primary[50],
  },
}));

const MenuList = observer(() => {
  const { globalConfigStore, firebaseSessionStore } = root;
  const history = useHistory();
  const [open, setOpen] = useState({});

  const handleClick = (id) => {
    setOpen(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const linkTo = (path) => {
    history.push(path);
  };

  return (
    <Drawer
      anchor={'left'}
      open={true}
      sx={{
        width: globalConfigStore.drawerWidth,
        flexShrink: 4,
        '& .MuiDrawer-paper': {
          width: globalConfigStore.drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
    >
      <MenuListContainer>
        <MenuHeader>
          <Tooltip title={'홈'} placement={'right'}>
            <Link to={'/'}>
              <Box
                component="img"
                sx={{
                  height: 48,
                  width: 48,
                }}
                alt="logo image"
                src={maxAvatar}
              />
            </Link>
          </Tooltip>
          {serverInfoChip}
        </MenuHeader>
        <SessionCard email={root.firebaseSessionStore.user?.email ?? undefined}
                     onLogout={() => firebaseSessionStore.signOut()}/>
        <MenuItemList>
          {
            Menus.map((it, index) => {
              return (
                <Box key={it.id}>
                  <Tooltip title={it.title} placement={'bottom'}>
                    <MenuItem key={it.id} onClick={() => it.items ? handleClick(it.id) : linkTo(it.link)}>
                      <ListItemIcon>
                        <it.icon fontSize={'large'}/>
                      </ListItemIcon>
                      {globalConfigStore.open ? (<ListItemText>{it.title}</ListItemText>) : null}
                      {it.items ? (open[it.id] ? <ExpandLess/> : <ExpandMore/>) : null}
                    </MenuItem>
                  </Tooltip>
                  <div>
                    {
                      it.items ?
                        (<Collapse in={open[it.id]} unmountOnExit>
                          <MenuSubItemList sx={{ pl: 2 }}>
                            {
                              it.items.map(item => {
                                return (
                                  <Tooltip key={item.id} title={item.title} placement={'right'}>
                                    <MenuSubItem key={item.id} onClick={() => linkTo(item.link)}>
                                      <ListItemIcon>
                                        {item.icon ? <item.icon fontSize={'large'}/> : <BugReportRounded/>}
                                      </ListItemIcon>
                                      {globalConfigStore.open ? (<ListItemText>{item.title}</ListItemText>) : null}
                                    </MenuSubItem>
                                  </Tooltip>
                                );
                              })
                            }
                          </MenuSubItemList>
                        </Collapse>) : undefined
                    }
                    {index !== Menus.length - 1 ? <Divider variant="middle"/> : undefined}
                  </div>
                </Box>
              );
            })
          }
        </MenuItemList>
        <MenuTail>
          {globalConfigStore.open ? versionChip : null}
          <IconButton onClick={() => globalConfigStore.toggleMenus()}>
            {globalConfigStore.open
              ? <ChevronLeft fontSize={'large'}/>
              : <ChevronRight fontSize={'large'}/>
            }
          </IconButton>
        </MenuTail>
      </MenuListContainer>
    </Drawer>
  );
});

export default MenuList;
