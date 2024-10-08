import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { CustomTabPanel } from '@renderer/components/CustomTabPanel'
import { WorkersList, WorkersLoader } from '@renderer/components/workers'
import { useState, SyntheticEvent } from 'react'

export function WorkersScreen() {
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', pb: 4, px: 2, maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12} direction="column">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab sx={{ fontSize: '1.2rem', mr: 3 }} label="Загрузчик" />
            <Tab sx={{ fontSize: '1.2rem' }} label="Список сотрудников" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <WorkersLoader />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <WorkersList />
        </CustomTabPanel>
      </Grid>
    </Box>
  )
}
