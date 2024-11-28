// import { Button } from 'payload/components/elements'
import { Button } from 'payload/components/elements'
import React from 'react'

function BudgetOverview() {
  return (
    <section id="expenses_overview" className='w-full h-96 bg-gray-800'>
      {/* <Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
        <Button>Test</Button> */}
      <h2>Budget Overview</h2>
      <Button el={'link'} to={'/admin/collections/expenses/create'}>Add new expense</Button>
    </section>
  )
}

export default BudgetOverview