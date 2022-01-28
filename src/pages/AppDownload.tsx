import { Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { Component, ReactNode } from 'react';
import DefaultPage from './DefaultPage';

interface DefaultContentsProps {
  breadcrumbs: ReactNode,
}

@observer
export class AppDownload extends Component<DefaultContentsProps>{
  getTitle(): string {
    return 'App Download';
  }

  getContent(): ReactNode {
    return (<Typography>AppDownload</Typography>);
  }

  render(): ReactNode {
    const {breadcrumbs} = this.props;
    return (<DefaultPage title={this.getTitle()} content={this.getContent()} breadcrumbs={breadcrumbs}/>)
  }
}
