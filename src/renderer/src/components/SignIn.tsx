import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
interface SignInProps {
  open: boolean
  handleClose: () => void
}

export function SignIn({ open, handleClose }: SignInProps) {
  const [emailError, setEmailError] = React.useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
  const [passwordError, setPasswordError] = React.useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (emailError || passwordError) {
      return
    }
    const data = new FormData(event.currentTarget)
    console.log({
      login: data.get('login'),
      password: data.get('password')
    })
  }

  const validateInputs = () => {
    const login = document.getElementById('login') as HTMLInputElement
    const password = document.getElementById('password') as HTMLInputElement

    let isValid = true

    if (!login.value) {
      setEmailError(true)
      setEmailErrorMessage('Введите валидный логин')
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage('')
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage('Введите валидный пароль')
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage('')
    }

    return isValid
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minWidth: '400px',
            gap: 2
          }}
        >
          <FormControl>
            <FormLabel htmlFor="login">Логин</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="login"
              type="login"
              name="login"
              placeholder="Логин"
              autoComplete="login"
              autoFocus
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'login' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Пароль</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type=""
              id="password"
              autoComplete="current-password"
              autoFocus
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3, gap: 8 }}>
        <Button fullWidth onClick={handleClose}>
          Закрыть
        </Button>
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  )
}
