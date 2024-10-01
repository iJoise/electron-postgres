import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { ChangeEvent, useState } from 'react'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import { WorkersService } from '@renderer/services/workersService'

export function WorkersScreen() {
  const [filename, setFilename] = useState('')

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    setFilename(file.name)

    const res = await WorkersService.updateWorkers(file.path)

    console.log(res)
  }

  return (
    <Box sx={{ width: '100%', pb: 4, px: 2, maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12} direction="column">
        <Typography component="h2" variant="h3">
          Работники
        </Typography>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadRoundedIcon />}
          sx={{ marginRight: '1rem' }}
        >
          Загрузить список работников XLS
          <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileUpload} />
        </Button>
        {filename}
      </Grid>
    </Box>
  )
}
