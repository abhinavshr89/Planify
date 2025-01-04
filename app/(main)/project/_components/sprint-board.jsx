"use client"
import { set } from 'date-fns'
import React from 'react'
import SprintManager from './sprint-manager'

const SprintBoard = ({sprints , projectId,orgId}) => {
    const [currentSprint, setCurrentSprint] = React.useState(
        sprints.find(sprint => sprint.status === "ACTIVE") || sprints[0]
    )
    
  return (
    <div>
        {/* Sprint Manager */}
        <SprintManager
            sprint={currentSprint}
            setSprint={setCurrentSprint}
            sprints={sprints}
            projectId={projectId}
        />

        {/* Kanban Board */}
        <p>Kanban Board</p>
    </div>
  )
}

export default SprintBoard