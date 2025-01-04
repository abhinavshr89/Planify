import React  from 'react'
import { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const ProjectLayout = ({children}) => {
  return (
    <div className='mx-auto'>
        <Suspense fallback={<div>Loading Projects ...</div>}>{children}</Suspense>
    </div>
  )
}

export default ProjectLayout