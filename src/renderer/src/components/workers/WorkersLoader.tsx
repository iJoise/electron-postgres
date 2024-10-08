import Button from '@mui/material/Button'
import { ChangeEvent, useState } from 'react'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import { WorkersService } from '@renderer/services/workersService'
import { WorkersAccordion } from '@renderer/components/workers/WorkersAccordion'
import { enqueueSnackbar } from 'notistack'
import Box from '@mui/material/Box'
import { useUserStore } from '@renderer/store/users'

export const WorkersLoader = () => {
  const [filename, setFilename] = useState('')
  const user = useUserStore(({ authorizedUser }) => authorizedUser)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    setFilename(file.name)

    const res = await WorkersService.updateWorkers(file.path)

    if (res.success) {
      enqueueSnackbar(res.data, {
        variant: 'success'
      })
    } else {
      enqueueSnackbar(JSON.stringify(res.error), {
        variant: 'error'
      })

      setFilename('')
    }
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <WorkersAccordion />
      </Box>
      <Button
        component="label"
        variant="outlined"
        color="secondary"
        disabled={user ? user.role !== 'super-admin' : undefined}
        startIcon={<CloudUploadRoundedIcon />}
        size="large"
        sx={{ marginRight: '1rem' }}
      >
        Загрузить список сотрудников XLS
        <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileUpload} />
      </Button>
      {filename}
    </>
  )
}
