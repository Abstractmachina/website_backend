import React from 'react';
import { Button, Eyebrow, Gutter } from 'payload/components/elements';
import NavigationAlert from '../components/NavigationAlert';

function Dashboard() {
  return (
    <>
      <Eyebrow></Eyebrow>
      <Gutter>
        <h1>Dashboard</h1>
        <Button el={'link'} to={'/admin/collections/projects'}>Projects</Button>
        <Button el={'link'} to={'/admin/collections/expenses'}>Expenses</Button>
        <Button el={'link'} to={'/admin/collections/projects'}>Project Tags</Button>
        <Button el={'link'} to={'/admin/collections/projects'}>Users</Button>
        <Button el={'link'} to={'/admin/collections/projects'}>Media</Button>
        <Button icon="plus" buttonStyle='icon-label' iconStyle='with-border' >Test</Button>
      </Gutter>
    </>
  )
}

export default Dashboard