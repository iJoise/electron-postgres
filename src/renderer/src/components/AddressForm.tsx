import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/system'
import { CustomDatePicker } from './CustomDatePicker'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column'
}))

export default function AddressForm() {
  return (
    <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography component="h2" variant="h5">
        Шаг 1
      </Typography>
      <Grid container spacing={3} sx={{ display: 'flex' }}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="first-name" required>
            Имя
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="Имя"
            autoComplete="first name"
            required
            size="medium"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="last-name" required>
            Фамилия
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Фамилия"
            autoComplete="last name"
            required
            size="medium"
          />
        </FormGrid>
        <CustomDatePicker />
      </Grid>
    </Grid>
  )
}
