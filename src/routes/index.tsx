import { Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { AppDownload } from '../pages/AppDownload';
import { Contents, YoutubeCategory } from '../pages/contents';
import { Home } from '../pages/Home';
import { NotFoundPage } from '../pages/NotFoundPage';
import SignIn from '../pages/SignIn';

export const routes = [
  {
    path: '/',
    label: 'Home',
    component: Home,
    routes: [
      {
        path: '/sign-in',
        label: 'sign-in',
        component: SignIn,
      },
      {
        path: '/download',
        label: 'download',
        component: AppDownload,
      },
      {
        path: '/contents',
        label: 'contents',
        component: Contents,
        routes: [
          {
            path: '/youtube',
            label: 'youtube',
            component: YoutubeCategory,
          },
        ]
      },
    ]
  },
  {
    path: '*',
    label: 'Page Not Found',
    component: NotFoundPage
  }
]

const combinePaths= (parent, child) =>
  `${parent.replace(/\/$/, "")}/${child.replace(/^\//, "")}`;

const buildPaths = (routes, parentPath = '') =>
  routes.map(route => {
    const path = combinePaths(parentPath, route.path);

    return {
      ... route,
      path,
      ...(route.routes && { routes: buildPaths(route.routes, path) })
    };
  });

const flattenRoutes = routes =>
  routes
    .map(route => [route.routes ? flattenRoutes(route.routes) : [], route])
    .flat(Infinity);

const pathTo = route => {
  if (!route.parent) {
    return [route];
  }

  return [...pathTo(route.parent), route];
};

const Breadcrumbs = ({ route }) => {
  return (<MUIBreadcrumbs
    sx={{
      color: 'rgb(176,154,217)',
      a: {
        color: 'rgb(214,215,245)',
        fontWeight: 'bold',
      },
    }}
    separator="›"
    aria-label="breadcrumb">
    {pathTo(route).map((crumb, index, breadcrumbs) => {
      return (<div key={index} className="item">
        {index < breadcrumbs.length - 1 && (
          <Link to={crumb.path}> {crumb.label}</Link>
        )}
        {index === breadcrumbs.length - 1 && crumb.label}
      </div>)
    })}
  </MUIBreadcrumbs>);
};

const Root = () => {

  const Page = ({ route }) => {
    const PageBody = route.component;
    return (<PageBody breadcrumbs={route.parent && <Breadcrumbs route={route} />} />)
  }
  const setupParents = (routes, parentRoute = null) =>
    routes.map(route => {
      const withParent = {
        ...route,
        ...(parentRoute ? { parent: parentRoute } : null),
      };

      return {
        ...withParent,
        ...(withParent.routes && {
          routes: setupParents(withParent.routes, withParent)
        })
      };
    });

  return (
    <BrowserRouter>
      <Switch>
      {
        flattenRoutes(setupParents(buildPaths(routes))).map(route => (
          <Route exact key={route.path} path={route.path}>
            <Page route={route}/>
          </Route>
        ))
      }
      </Switch>
    </BrowserRouter>
  );
}

export default Root;
