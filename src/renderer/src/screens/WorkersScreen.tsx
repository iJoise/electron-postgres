import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { WorkersList, WorkersLoader } from '@renderer/components/workers'
import { useState, SyntheticEvent } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

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
            <Tab sx={{ fontSize: '1.2rem', mr: 3 }} label="Загрузчик" {...a11yProps(0)} />
            <Tab sx={{ fontSize: '1.2rem' }} label="Список сотрудников" {...a11yProps(1)} />
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
