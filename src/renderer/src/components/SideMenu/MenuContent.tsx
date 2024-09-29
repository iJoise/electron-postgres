import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import { NavLink } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import { useUserStore } from '@renderer/store/users'
import { useMemo } from 'react'

const mainListItems = [
  { text: 'Отчёт', icon: <AnalyticsRoundedIcon />, path: '/', isAuth: false },
  { text: 'Пользователи', icon: <PeopleAltRoundedIcon />, path: 'users', isAuth: true }
]

export default function MenuContent() {
  const isAuth = useUserStore(({ authorizedUser }) => !!authorizedUser)

  const menuListItems = useMemo(
    () => mainListItems.filter((route) => !(route.isAuth && !isAuth)),
    [isAuth]
  )

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {menuListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={(theme) => ({
                '&.active': {
                  backgroundColor: alpha(theme.palette.action.selected, 1)
                }
              })}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
