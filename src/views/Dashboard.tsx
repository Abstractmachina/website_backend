import React from 'react';
import { Button, Eyebrow, Gutter } from 'payload/components/elements';

function Dashboard() {
  return (
    <>
      <Eyebrow></Eyebrow>
      <Gutter>
        <h1>Dashboard</h1>
        <Button>Test</Button>
        <Button icon="plus" buttonStyle='icon-label' iconStyle='with-border' >Test</Button>
      </Gutter>
    </>
  )
}

export default Dashboard