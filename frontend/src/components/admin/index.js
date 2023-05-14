import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardContainer from './DashboardContainer'

const Admin = () => {
  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  )
}

export default Admin;