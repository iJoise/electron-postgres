import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { useUserStore } from '@renderer/store/users'
import { useEffect, useMemo, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { UsersDataGrid, ActionButton, AddUserDialog } from '@renderer/components/users'

export function UsersScreen() {
  const { getUsers, users, loading, authorizedUser, deleteUser } = useUserStore()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const columns: GridColDef[] = useMemo(() => {
    const col: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 80 },
      { field: 'full_name', headerName: 'Пользователь', flex: 1.5, minWidth: 200 },
      { field: 'role', headerName: 'Роль', flex: 1, minWidth: 200 }
    ]

    if (authorizedUser && authorizedUser.role === 'super-admin') {
      col.push({
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (params) => {
          const disabled = params.row.full_name === 'Super Admin'

          return <ActionButton params={params} disabled={disabled} onClick={deleteUser} />
        }
      })
    }

    return col
  }, [authorizedUser])

  return (
    <Box sx={{ width: '100%', pb: 4, px: 2, maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12} direction="column">
        <Typography component="h2" variant="h3">
          Администраторы
        </Typography>
        <Box sx={{ width: '100%' }}>
          <UsersDataGrid
            rows={users}
            loading={loading}
            columns={columns}
            role={authorizedUser ? authorizedUser.role : undefined}
            handleFooterOnClick={() => setOpen(true)}
          />
        </Box>
      </Grid>
      <AddUserDialog handleClose={() => setOpen(false)} open={open} />
    </Box>
  )
}
