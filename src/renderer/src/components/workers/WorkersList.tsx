import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { WorkersService } from '@renderer/services/workersService'
import { WorkersType } from '@renderer/types/workers'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'full_name', headerName: 'Сотрудник', flex: 0.7, minWidth: 200 },
  { field: 'position', headerName: 'Должность', flex: 1, minWidth: 200 },
  { field: 'department', headerName: 'Предприятие', flex: 1, minWidth: 200 }
]

export const WorkersList = () => {
  const [rows, setRows] = useState<WorkersType[]>([])
  const [loading, setLoading] = useState(false)

  const fetchWorkers = async () => {
    return await WorkersService.getAllWorkers()
  }

  useEffect(() => {
    setLoading(true)

    fetchWorkers()
      .then((res) => {
        if (res.success) {
          setRows(res.data)
        } else {
          enqueueSnackbar(
            JSON.stringify(typeof res.error === 'string' ? res.error : res.error?.message),
            {
              variant: 'error'
            }
          )
        }
      })
      .catch((err) =>
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      )
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <DataGrid
        loading={loading}
        autoHeight
        rows={rows}
        columns={columns}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        density="compact"
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 15 } }
        }}
        pageSizeOptions={[15, 30, 50, 100]}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'skeleton'
          }
        }}
      />
    </>
  )
}
