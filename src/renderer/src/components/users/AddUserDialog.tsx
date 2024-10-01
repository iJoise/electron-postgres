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
import { MenuItem, Select, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { RolesType, User } from '@renderer/types/users'

interface AddUserDialogProps {
  open: boolean
  handleClose: () => void
}
interface FormFields {
  login: HTMLInputElement
  full_name: HTMLInputElement
  password: HTMLInputElement
  check_password: HTMLInputElement
  role: HTMLInputElement
}

export function AddUserDialog({ open, handleClose }: AddUserDialogProps) {
  const { addUser } = useUserStore()
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement & FormFields>) => {
    event.preventDefault()
    setErrorMessage('')

    const form = event.currentTarget
    const login = form.login.value
    const password = form.password.value
    const check_password = form.check_password.value
    const full_name = form.full_name.value
    const role = form.role.value as RolesType

    if (password !== check_password) {
      setErrorMessage('Пароли должны совпадать')
      return
    }

    if (!form || !login || !password || !check_password || !full_name || !role) {
      setErrorMessage('Все поля обязательны для заполнения')
      return
    }

    const payload: Omit<User, 'id'> = {
      login,
      password,
      full_name,
      role
    }

    const user = await addUser(payload)

    if (user) {
      handleClose()
      enqueueSnackbar(`Пользователь ${user.full_name} успешно добавлен`, {
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
              id="login"
              name="login"
              placeholder="Логин"
              autoFocus
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: 'login' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="full_name">Полное имя</FormLabel>
            <TextField
              id="full_name"
              name="full_name"
              placeholder="Полное имя"
              autoFocus
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: 'login' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Пароль</FormLabel>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoFocus
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="check_password">Подтвердите пароль</FormLabel>
            <TextField
              name="check_password"
              placeholder="••••••"
              type="password"
              id="check_password"
              autoFocus
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="role">Выберите роль</FormLabel>
            <Select
              name="role"
              placeholder="••••••"
              id="role"
              variant="outlined"
              defaultValue="user"
            >
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="super-admin">super-admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {errorMessage.length ? (
          <Typography variant="h5" color="red">
            {errorMessage}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3, gap: 8 }}>
        <Button fullWidth onClick={handleClose}>
          Закрыть
        </Button>
        <Button type="submit" fullWidth variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
