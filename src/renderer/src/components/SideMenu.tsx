import { styled } from '@mui/material/styles'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'
import MenuContent from './MenuContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import { ColorModeIconDropdown } from '../theme/ColorModeIconDropdown'
import React from 'react'
import { SignIn } from './SignIn'

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

  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper'
        }
      }}
    >
      <ColorModeIconDropdown />
      <Divider />
      <MenuContent />
      <Divider />

      <Stack sx={{ p: 2 }}>
        <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
          Выйти
        </Button>
      </Stack>
      <Stack sx={{ p: 2 }}>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          fullWidth
          startIcon={<LoginRoundedIcon />}
        >
          Войти
        </Button>
      </Stack>
      <SignIn open={open} handleClose={() => setOpen(false)} />
    </Drawer>
  )
}
