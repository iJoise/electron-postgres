import { Container, Typography, Button } from '@mui/material'
import { useCountStore } from './store/counter'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const { counts, loading, error } = useCountStore()

  // useEffect(() => {
  //   // Загружаем данные из базы данных при монтировании компонента
  //   fetchCounts()
  // }, [fetchCounts])

  // const handleAddCount = async () => {
  //   const newValue = Math.floor(Math.random() * 100)
  //   await addNewCount(newValue)
  // }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Container>
      <Typography variant="h4">Hello World!</Typography>
      <Typography variant="h6">
        Count:{' '}
        {counts.map((count) => (
          <li key={count.id}>{count.value}</li>
        ))}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          return
        }}
      >
        Increment
      </Button>
    </Container>
  )
}

export default App
