
import { getOrganization } from '@/actions/organization';

import React from 'react'
import OrgSwitcher from '@/components/org-switcher';

const Organization = async ({params}) => {
    const{orgId} = params;
    const organization = await getOrganization(orgId);

    if(!organization){
        return <div>Organization not found</div>
    }
    
    return (
      <div className='mx-auto'>
        <div className='mb-4 flex flex-col sm:flex-row justify-between items-start'>
          <h1 className='text-5xl font-bold gradient-title'>{organization.name}'s Project</h1>
        {/* org switcher */}
        
        <OrgSwitcher/>
        </div>

        <div className='mb-4'>
            show org projects 
        </div>
        <div className='mt-4'>
          show user assigned and reported issues here 
        </div>
      </div>
    )
}

export default Organization