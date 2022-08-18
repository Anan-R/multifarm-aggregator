import { Button, Grid, Link, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { resetPassword } from "../../api/auth"
import styles from './auth.module.scss'

export default function ResetPwd(): JSX.Element | null {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [errormsg, setErrormsg] = useState('')
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const handleValidation = () => {
    //Password
    if (!password) {
      setErrormsg("Please input your password.");
      return false;
    }

    //confirmPassword
    if (!confirmPassword) {
      setErrormsg("Please input your password again.");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()) {
      enableLoading();
      resetPassword('email', 'token', password)
        .then(() => {
          disableLoading()
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
      <Typography variant="h5">CREATE NEW PASSWORD</Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">
          Your new password must be different from previous used passwords.
        </Typography>
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
        <Typography variant="h6">Confirm Password</Typography>
        <TextField
          type="password"
          placeholder="Your Password Again"
          fullWidth
          name="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className={errormsg?styles.form_error:''}
        />
        <span className={styles.errormsg}>{errormsg}</span>
        <Button variant="contained" color="primary" type="submit">
          Reset Password
        </Button>
      </form>
    </Grid>
  )
}
