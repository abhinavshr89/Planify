import React from 'react'
import { getProject } from '@/actions/project';
import SpringCreationForm from '../_components/create-sprint';
import SprintBoard from '../_components/sprint-board';

const Page = async ({params}) => {
  const {projectId} = params;
  const project = await getProject(projectId);

  if(!project){
    return <div>Project not found</div>
  }

  return (
    <div>
      {/* Sprint Creation Component */}
      <SpringCreationForm
        projectTitle={project.name}
        projectId={projectId}
        projectKey={project.key}
        sprintKey={project.sprints?.length + 1}
      
      
      />
      {/* Sprint Board Component */}
       {
        project.sprints.length >0 ?(
         <SprintBoard
          sprints={project.sprints}
          projectId={projectId}
          orgId={project.organizationId}
         />
        ): (
          <div><p>Create a sprint from the button above </p></div>
        )
       }
    </div>
  )
}

export default Page