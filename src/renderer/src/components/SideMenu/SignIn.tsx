import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useUserStore } from '@renderer/store/users'
import { Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

interface SignInProps {
  open: boolean
  handleClose: () => void
}
interface FormFields {
  login: HTMLInputElement
  password: HTMLInputElement
}

export function SignIn({ open, handleClose }: SignInProps) {
  const { authorizedErrorMessage, loginUser } = useUserStore()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement & FormFields>) => {
    event.preventDefault()
    const form = event.currentTarget
    const { login, password } = form

    const user = await loginUser(login.value, password.value)

    if (user) {
      handleClose()
      enqueueSnackbar(`Пользователь ${user.fullname} успешно авторизован`, {
        variant: 'success'
      })
    }
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
              error={!!authorizedErrorMessage}
              id="login"
              type="login"
              name="login"
              placeholder="Логин"
              autoComplete="login"
              autoFocus
              fullWidth
              variant="outlined"
              color={authorizedErrorMessage ? 'error' : 'primary'}
              sx={{ ariaLabel: 'login' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Пароль</FormLabel>
            <TextField
              error={!!authorizedErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              fullWidth
              variant="outlined"
              color={authorizedErrorMessage ? 'error' : 'primary'}
            />
          </FormControl>
        </Box>
        {authorizedErrorMessage ? (
          <Typography variant="h5" color="red">
            {authorizedErrorMessage}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3, gap: 8 }}>
        <Button fullWidth onClick={handleClose}>
          Закрыть
        </Button>
        <Button type="submit" fullWidth variant="contained">
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  )
}
