import { styled } from '@mui/material/styles'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'
import MenuContent from './MenuContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import { ColorModeButton } from '../../theme/ColorModeButton'
import React from 'react'
import { SignIn } from './SignIn'
import { useUserStore } from '@renderer/store/users'
import { enqueueSnackbar } from 'notistack'

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box'
  }
})

export function SideMenu() {
  const [open, setOpen] = React.useState(false)
  const { authorizedUser, clearAuth } = useUserStore(({ authorizedUser, clearAuth }) => ({
    authorizedUser,
    clearAuth
  }))
  const authIcon = authorizedUser ? <LogoutRoundedIcon /> : <LoginRoundedIcon />

  const handleAuthClick = () => {
    if (authorizedUser) {
      const userName = authorizedUser.full_name

      clearAuth()
      enqueueSnackbar(`Сеанс пользователя ${userName} закончен`, {
        variant: 'info'
      })
    } else {
      setOpen(true)
    }
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper'
        }
      }}
    >
      <ColorModeButton />
      <Divider />
      <MenuContent />
      <Divider />

      <Stack sx={{ p: 2 }}>
        <Button onClick={handleAuthClick} variant="outlined" fullWidth startIcon={authIcon}>
          {authorizedUser ? 'Выйти' : 'Авторизоваться'}
        </Button>
      </Stack>
      <SignIn open={open} handleClose={() => setOpen(false)} />
    </Drawer>
  )
}
