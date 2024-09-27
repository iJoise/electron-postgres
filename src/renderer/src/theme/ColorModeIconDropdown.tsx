import * as React from 'react'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightModeOutlined'
import { useColorScheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export function ColorModeIconDropdown() {
  const { mode, systemMode, setMode } = useColorScheme()

  const handleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  const resolvedMode = (systemMode || mode) as 'light' | 'dark'

  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />
  }[resolvedMode]

  return (
    <React.Fragment>
      <Stack sx={{ p: 2 }}>
        <Button variant="outlined" fullWidth startIcon={icon} onClick={handleMode}>
          {mode === 'dark' ? 'Тёмная' : 'Светлая'}
        </Button>
      </Stack>
    </React.Fragment>
  )
}
