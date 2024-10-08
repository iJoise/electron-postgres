import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { CustomTabPanel } from '@renderer/components/CustomTabPanel'
import { Settings } from '@renderer/components/settings-report'
import { ErrorsMessages } from '@renderer/enums'
import { SettingsService } from '@renderer/services/settingsService'
import { SettingsElementType, SettingsTableType } from '@renderer/types/settings'
import { enqueueSnackbar } from 'notistack'
import { useState, SyntheticEvent } from 'react'

export function SettingsScreen() {
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const onSubmit = async (values: {
    tableType: SettingsTableType
    element: SettingsElementType
  }) => {
    try {
      const res = await SettingsService.insetSettings(values)
      console.log(res)

      if (res.success) {
        enqueueSnackbar(`№ ${values.element.number} успешно добавлен`, {
          variant: 'success'
        })

        await SettingsService.getAllSetting(values.tableType)
      } else {
        enqueueSnackbar(JSON.stringify(res.error), {
          variant: 'error'
        })
      }
    } catch (error) {
      enqueueSnackbar(ErrorsMessages.UNEXPECTED, {
        variant: 'error'
      })
    }
  }

  return (
    <Box sx={{ width: '100%', pb: 4, px: 2, maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12} direction="column">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab sx={{ fontSize: '1.2rem', mr: 3 }} label="Долотья" />
            <Tab sx={{ fontSize: '1.2rem', mr: 3 }} label="ВЗД" />
            <Tab sx={{ fontSize: '1.2rem', mr: 3 }} label="Телеметрии" />
            <Tab sx={{ fontSize: '1.2rem', mr: 3 }} label="Блок батарей" />
            <Tab sx={{ fontSize: '1.2rem', mr: 3 }} label="Скважины" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Settings type="doloto" onSubmit={onSubmit} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Settings type="vzd" onSubmit={onSubmit} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Settings type="telemetry" onSubmit={onSubmit} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Settings type="bb" onSubmit={onSubmit} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Settings type="well" onSubmit={onSubmit} />
        </CustomTabPanel>
      </Grid>
    </Box>
  )
}
