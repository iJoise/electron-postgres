import { Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { ErrorsMessages } from '@renderer/enums'
import { WorkersService } from '@renderer/services/workersService'
import { DepartmentsType } from '@renderer/types/workers'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

export const Department = () => {
  const [departments, setDepartments] = useState<DepartmentsType[]>([])

  const fetchDepartment = async () => {
    try {
      const res = await WorkersService.getAllDepartments()

      if (res.success) {
        setDepartments(res.data)
      } else {
        enqueueSnackbar(
          JSON.stringify(typeof res.error === 'string' ? res.error : res.error?.message),
          {
            variant: 'error'
          }
        )
      }
    } catch (error) {
      enqueueSnackbar(ErrorsMessages.UNEXPECTED, {
        variant: 'error'
      })
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [])

  return (
    <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography component="h2" variant="h5">
        Структурное подразделение:
      </Typography>
      {departments.length ? (
        <Grid gap={3} sx={{ display: 'flex' }}>
          {departments
            .filter((dep) => dep.is_active)
            .map((dep) => (
              <Button key={dep.id} variant="outlined" color="secondary" size="large">
                {dep.name}
              </Button>
            ))}
        </Grid>
      ) : null}
    </Grid>
  )
}
