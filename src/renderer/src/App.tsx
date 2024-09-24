import { useEffect, useState } from 'react'
import { useUserStore } from './store/counter'
import { Button } from '@mui/material'

function App() {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const { users, getUsers, loading, error, addUser } = useUserStore()
  const [login, setLogin] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    getUsers()
  }, [])

  const handleAddUser = async () => {
    await addUser({ login, fullName, password, role })
    setLogin('')
    setFullName('')
    setPassword('')
    setRole('')
  }

  return (
    <div>
      <h1>User Management</h1>
      <input placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </Button>
      <h2>Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.fullName} ({user.login}) - {user.role}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
