import Button from '@mui/material/Button'
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'
import { User } from '@renderer/types/users'

type ActionButtonProps = {
  params: GridRenderCellParams<User, any, any, GridTreeNodeWithRender>
  disabled: boolean
  onClick: (id: number) => void
}

export const ActionButton = ({ params, disabled, onClick }: ActionButtonProps) => {
  const handleClick = () => {
    onClick(params.row.id)
  }

  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="error"
      size="small"
      onClick={handleClick}
    >
      Удалить
    </Button>
  )
}
