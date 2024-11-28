import React from 'react';
import { Button, Eyebrow, Gutter } from 'payload/components/elements';
import NavigationAlert from '../components/NavigationAlert';
import BudgetOverview from '../components/BudgetOverview';
import TasksOverview from '../components/TasksOverview';

function Dashboard() {
  return (
    <>
      {/* <Eyebrow></Eyebrow> */}
      <Gutter className=''>
        <h1>Dashboard</h1>
        <div className='flex flex-col gap-2'>
          <TasksOverview />
          <BudgetOverview />
        </div>
        <Button el={'link'} to={'/admin/collections/projects'}>Projects</Button>
        <Button el={'link'} to={'/admin/collections/projects'}>Project Tags</Button>
        <Button el={'link'} to={'/admin/collections/projects'}>Users</Button>
        <Button el={'link'} to={'/admin/collections/projects'}>Media</Button>
        <Button icon="plus" buttonStyle='icon-label' iconStyle='with-border' >Test</Button>
      </Gutter>
    </>
  )
}

export default Dashboard