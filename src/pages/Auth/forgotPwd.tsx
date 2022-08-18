import { Button, Grid, Link, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { forgotPassword } from '../../api/auth'
import styles from './auth.module.scss'

export default function ForgotPwd(): JSX.Element | null {
  const [email, setEmail] = useState('')
  const [errormsg, setErrormsg] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const handleValidation = () => {
    let errorMsg = ''
    let formIsValid = true

     //Email
    if (!email) {
      formIsValid = false
      errorMsg = "Please input your email address."
    } else {

      let lastAtPos = email.lastIndexOf("@")
      let lastDotPos = email.lastIndexOf(".")

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errorMsg = "The email address is invalid.";
      }
    }
    setErrormsg(errorMsg);
    return formIsValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()) {
      enableLoading();
      forgotPassword(email)
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
      <Typography variant="h5">RESET THE PASSWORD</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Typography variant="h6">
          Enter the email address associated with your account and we’ll send an
          email with instructions to reset your password.
        </Typography>
        <Typography variant="h6">Email Address</Typography>
        <TextField
          type="email"
          placeholder="Your Email"
          fullWidth
          name="email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value) }
          className={errormsg?styles.form_error:''}
          autoFocus
        />
        <span className={styles.errormsg}>{errormsg}</span>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Send Instructions
        </Button>
      </form>
    </Grid>
  )
}
