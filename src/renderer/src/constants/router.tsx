import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

export const mainListItems = [
  { text: 'Отчёт', icon: <AnalyticsRoundedIcon />, path: '/', isAuth: false },
  { text: 'Настройки', icon: <SettingsRoundedIcon />, path: 'settings', isAuth: true },
  { text: 'Сотрудники', icon: <EngineeringRoundedIcon />, path: 'workers', isAuth: true },
  { text: 'Администраторы', icon: <PeopleAltRoundedIcon />, path: 'users', isAuth: true }
]
