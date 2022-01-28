import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Copyright } from '../components/Copyright';
import logo from '../images/logo1.png';
import { root } from '../index';

@observer
export default class SignIn extends Component {

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const rememberMe = document.getElementById('rememberMe') as any;

    const { firebaseSessionStore } = root;
    firebaseSessionStore.signIn(email, password, rememberMe.checked);
  };

  render() {
    document.title = `Max\'s Page | Sign in`;
    const { firebaseSessionStore } = root;
    return !firebaseSessionStore.user ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              sx={{
                height: 80,
                width: 80,
              }}
              alt="logo image"
              src={logo}
            />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox id="rememberMe" value="remember" color="primary"/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }}/>
        </Container>
    ) : (<Redirect to={'/'}/>);
  }
}
