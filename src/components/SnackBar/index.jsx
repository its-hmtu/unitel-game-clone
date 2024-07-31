import { Snackbar, Alert } from '@mui/material'
import { styled } from "@mui/system";
import { SnackBarContext } from 'contexts/SnackBarContext'
import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

const SnackBar = ({runSnackBar, message, severity, ...props}) => {
  const {snackBar, setSnackBar} = useContext(SnackBarContext);

  const [openTime, setOpenTime] = useState(false)

  useEffect(() => {
    if (runSnackBar) {
      setOpenTime(5000)
    }
  }, [runSnackBar])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar({
      ...snackBar,
      open: false,
    })

    console.log(snackBar)
  }

  return ReactDOM.createPortal(
    <Root>
      <Snackbar
        open={runSnackBar}
        autoHideDuration={openTime}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} variant='filled' elevation={6}>
          {message}
        </Alert>
        
      </Snackbar>
    </Root>,
    document.body
  )
}

export default SnackBar