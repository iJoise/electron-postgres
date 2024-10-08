import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SettingsService } from '@renderer/services/settingsService'
import { useUserStore } from '@renderer/store/users'
import { SettingsElementType, SettingsTableType } from '@renderer/types/settings'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CustomDataGrid } from '../CustomDataGrid'
import { GridColDef } from '@mui/x-data-grid'
import { ActionButton } from '../users'
import { enqueueSnackbar } from 'notistack'
import { ErrorsMessages } from '@renderer/enums'

type KnbSettingsType = {
  type: SettingsTableType
  onSubmit: (params: {
    tableType: SettingsTableType
    element: SettingsElementType
  }) => Promise<void>
}

const TITLE: Record<KnbSettingsType['type'], string> = {
  doloto: 'долото',
  vzd: 'ВЗД',
  telemetry: 'телеметрию',
  bb: 'блок батареи',
  well: '№ скважины'
}

export const Settings = ({ type, onSubmit }: KnbSettingsType) => {
  const user = useUserStore(({ authorizedUser }) => authorizedUser)
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState('')
  const [mileage, setMileage] = useState('0')
  const [elements, setElements] = useState<SettingsElementType[]>([])

  const disabled = user ? user.role !== 'super-admin' : undefined

  const getAllElements = useCallback(async () => {
    setLoading(true)
    const res = await SettingsService.getAllSetting(type)

    if (res.success) {
      setElements(res.data)
    }

    setLoading(false)
  }, [elements])

  const handleDeleteElement = async (id: number) => {
    try {
      const res = await SettingsService.deleteSetting({ tableType: type, identifier: id })

      if (res.success) {
        enqueueSnackbar(`№ ${res.data.number} успешно удалён`, {
          variant: 'success'
        })

        await getAllElements()
      }
    } catch (error) {
      enqueueSnackbar(ErrorsMessages.UNEXPECTED, {
        variant: 'error'
      })
    }
  }

  const columns: GridColDef[] = useMemo(() => {
    const col: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 80 },
      { field: 'number', headerName: 'Номер', width: 300 }
    ]

    if (user && user.role === 'super-admin') {
      col.push({
        field: 'action',
        headerName: 'Действия',
        sortable: false,
        flex: 1,
        align: 'center',
        renderCell: (params) => {
          const disabled = params.row.full_name === 'Super Admin'

          return <ActionButton params={params} disabled={disabled} onClick={handleDeleteElement} />
        }
      })
    }

    return col
  }, [user])

  useEffect(() => {
    getAllElements()

    return () => {
      setNumber('')
      setMileage('0')
    }
  }, [])

  const onSubmitHandler = async () => {
    await onSubmit({
      tableType: type,
      element: {
        number,
        mileage
      }
    })

    await getAllElements()

    setNumber('')
  }

  return (
    <Stack gap={3}>
      <Typography variant="h6">Добавить {TITLE[type]}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          width: '100%',
          minWidth: '400px',
          gap: 4
        }}
      >
        <FormControl>
          <FormLabel htmlFor="number">Номер</FormLabel>
          <TextField
            value={number}
            disabled={disabled}
            id="number"
            name="number"
            autoFocus
            fullWidth
            variant="outlined"
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormControl>
        {type !== 'well' && (
          <FormControl>
            <FormLabel htmlFor="mileage">Начальный пробег (км)</FormLabel>
            <TextField
              value={mileage}
              disabled={disabled}
              type="number"
              name="mileage"
              id="mileage"
              fullWidth
              variant="outlined"
              onChange={(e) => setMileage(e.target.value)}
            />
          </FormControl>
        )}
        <Button
          disabled={!number.length || disabled}
          size="medium"
          variant="contained"
          color="success"
          onClick={onSubmitHandler}
        >
          Добавить
        </Button>
      </Box>
      {elements.length ? (
        <Box
          sx={{
            width: '100%',
            minWidth: '400px',
            maxWidth: '530px'
          }}
        >
          <CustomDataGrid
            disableRowSelectionOnClick
            rows={elements}
            columns={columns}
            loading={loading}
          />
        </Box>
      ) : null}
    </Stack>
  )
}
