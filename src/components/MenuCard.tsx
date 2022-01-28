import { Card, CardContent, CardMedia, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/logo1.png';

const ItemCard = styled(Card)(() => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  width: 200,
  height: 144,
  borderRadius: 32,
  '&:hover': {
    filter: 'brightness(1.20)',
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

export const cardBgColors = [
  'rgb(243,150,41)',
  'rgb(98,196,9)',
  'rgb(17,199,133)',
  'rgb(15,112,224)',
  'rgb(132,41,243)',
  'rgb(246,30,30)',
];

export interface MenuCardProp {
  title: string,
  image?: string,
  link: string,
  bgColorIndex: number,
  icon?: any,
}

export const MenuCard = (prop: MenuCardProp) => {
  return (<ItemCard>
    <Link to={prop.link} style={{ textDecoration: 'none' }}>
      <CardMedia>
        <img
          src={prop.image ?? logo}
          style={{
            width: '100%',
            height: 95,
            backgroundColor: cardBgColors[prop.bgColorIndex % cardBgColors.length],
            objectFit: 'cover',
          }}
          alt="menu image"
        />
      </CardMedia>
      <ItemCardContent>
        { prop.title }
        { prop.icon ? <prop.icon fontSize={'large'}/> : undefined }
      </ItemCardContent>
    </Link>
  </ItemCard>)
}
