import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { register } from "../../api/auth"
import styles from './auth.module.scss'

export default function Signup(): JSX.Element | null {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleValidation = () => {
    //Email Address
    if (!email) {
      setErrormsg("Please input your email adddress.");
      return false;
    }

    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") == -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      setErrormsg("The email address is invalid.");
      return false;
    }

    //Full Name
    if (!username) {
      setErrormsg("Please input your full name.");
      return false;
    }

    //Password
    if (!password) {
      setErrormsg("Please input your password.");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()) {
      enableLoading();
      register(email, username, password)
        .then(() => {
          disableLoading();
          history.push('/login')
        })
        .catch(() => {
          disableLoading();
        });
    }
  }
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      className={styles.form_wrapper}
      direction="column"
    >
      <Typography variant="h5">SIGN UP</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Typography variant="h6">Email Address</Typography>
        <TextField
          type="email"
          placeholder="Your Email"
          fullWidth
          name="email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
          className={errormsg?styles.form_error:''}
        />
        <Typography variant="h6">Full Name</Typography>
        <TextField
          type="text"
          placeholder="Your Full Name"
          fullWidth
          name="username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className={errormsg?styles.form_error:''}
        />
        <Typography variant="h6">Password</Typography>
        <TextField
          type="password"
          placeholder="Your Password"
          fullWidth
          name="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={errormsg?styles.form_error:''}
        />
        <span className={styles.errormsg}>{errormsg}</span>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        {loading && <span className="ml-3 spinner spinner-white"></span>}
      </form>
    </Grid>
  )
}
