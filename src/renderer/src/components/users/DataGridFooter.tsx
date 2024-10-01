import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

type DataGridFooterProps = {
  onClick: () => void
}
export const DataGridFooter = ({ onClick }: DataGridFooterProps) => (
  <Box
    sx={(theme) => ({
      p: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: theme.palette.background.paper
    })}
  >
    <Button variant="contained" size="small" onClick={onClick}>
      Добавить пользователя
    </Button>
  </Box>
)
