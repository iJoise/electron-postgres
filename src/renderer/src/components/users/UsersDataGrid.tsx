import { DataGrid, GridColDef, GridFooter, GridRowsProp } from '@mui/x-data-grid'
import { DataGridFooter } from './DataGridFooter'
import { RolesType } from '@renderer/types/users'

type DataGripProps = {
  rows: GridRowsProp
  loading: boolean
  columns: GridColDef[]
  role: RolesType | undefined
  handleFooterOnClick: () => void
}

export function UsersDataGrid({
  rows,
  loading,
  columns,
  handleFooterOnClick,
  role
}: DataGripProps) {
  return (
    <DataGrid
      loading={loading}
      autoHeight
      rows={rows}
      columns={columns}
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
      disableColumnResize
      density="standard"
      disableColumnFilter
      disableColumnSorting
      disableRowSelectionOnClick
      hideFooterPagination
      disableColumnMenu
      slotProps={{
        loadingOverlay: {
          variant: 'linear-progress',
          noRowsVariant: 'skeleton'
        }
      }}
      slots={{
        footer: () =>
          role === 'super-admin' ? <DataGridFooter onClick={handleFooterOnClick} /> : <GridFooter />
      }}
    />
  )
}
