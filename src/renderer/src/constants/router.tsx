import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'

export const mainListItems = [
  { text: 'Отчёт', icon: <AnalyticsRoundedIcon />, path: '/', isAuth: false },
  { text: 'Администраторы', icon: <PeopleAltRoundedIcon />, path: 'users', isAuth: true },
  { text: 'Работники', icon: <EngineeringRoundedIcon />, path: 'workers', isAuth: true }
]
