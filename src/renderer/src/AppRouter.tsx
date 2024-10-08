import { Route } from 'react-router-dom'
import { Router } from '../../lib/electron-router-dom'
import { Layout } from '@renderer/Layout'
import { ReportScreen } from '@renderer/screens/ReportScreen'
import { UsersScreen } from '@renderer/screens/UsersScreen'
import { WorkersScreen } from './screens/WorkersScreen'
import { SettingsScreen } from './screens/SettingsScreen'

export const AppRouter = () => {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ReportScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/workers" element={<WorkersScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>
      }
    />
  )
}
