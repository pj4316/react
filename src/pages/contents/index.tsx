import { Avatar, Box, styled } from '@mui/material';
import { observer } from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import { MenuCard } from '../../components/MenuCard';
import DefaultPage from '../DefaultPage';
import { YoutubeCategoryPage } from './youtube/YoutubeCategoryPage';
import { MenuItem } from '../../components/MenuList';
import youtubeImage from '../../images/youtube.png';

const youtubeIcon = () => <Avatar variant='rounded' src={youtubeImage} />;
export const ContentItems: MenuItem[] = [
  {
    id: 1,
    title: 'Youtube',
    icon: youtubeIcon,
    link: 'contents/youtube',
  },
];

const MainContent = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  flexWrap: 'wrap',
  gap: 32,
}));

export const YoutubeCategory = YoutubeCategoryPage;

interface DefaultContentsProps {
  breadcrumbs: ReactNode,
}

@observer
export class Contents extends Component<DefaultContentsProps> {
  getTitle(): string {
    return 'Contents';
  }

  getContent(): ReactNode {
    return (
      <MainContent>
        {
          ContentItems.map((item, index) => {
            return (<MenuCard
              key={item.id}
              title={item.title}
              image={item.image}
              link={item.link}
              bgColorIndex={index}
            />);
          })
        }</MainContent>);
  }

  render(): ReactNode {
    const { breadcrumbs } = this.props;
    return (
      <DefaultPage title={this.getTitle()} content={this.getContent()} breadcrumbs={breadcrumbs}/>
    );
  }
}
