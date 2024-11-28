import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'


import { DocumentTabComponent } from 'payload/dist/admin/components/elements/DocumentHeader/Tabs/types'

const TestView2: DocumentTabComponent = (props) => {
  const { path } = props
  const match = useRouteMatch()

  return (
    <li className="custom-doc-tab">
      <Link
        className="px-2 py-6 rounded-sm text-nowrap bg-gray-600"
        to={`${match.url}${path}`
        }>Custom Tab Component</Link>
    </li>
  )
}

export default TestView2