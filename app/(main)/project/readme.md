
## Flow of SprintBoard and CreateIssue Components

1. **SprintBoard Component**:
   - The `SprintBoard` component is responsible for displaying the sprint manager and the Kanban board.
   - It initializes the state for the current sprint, drawer visibility, and selected status.
   - The `SprintManager` component is used to manage and switch between different sprints.
   - The `DragDropContext` component from `@hello-pangea/dnd` is used to enable drag-and-drop functionality for the Kanban board.
   - The Kanban board is divided into columns based on the statuses defined in the `statuses` array.
   - Each column contains a button to create a new issue if the column key is "TODO" and the current sprint is not completed.
   - The `CreateIssue` component is rendered as a drawer and is controlled by the `isDrawerOpen` state.

2. **CreateIssue Component**:
   - The `CreateIssue` component is a drawer that allows users to create a new issue.
   - It receives props such as `isOpen`, `onClose`, `sprintId`, `status`, `projectId`, `onIssueCreated`, and `orgId`.
   - The drawer is opened when the `isOpen` prop is true and closed when the `onClose` function is called.
   - The drawer contains a header with the title "Create New Issue".

3. **Interaction Flow**:
   - When the "Create Issue" button is clicked in the `SprintBoard` component, the `handleAddIssue` function is called.
   - The `handleAddIssue` function sets the selected status and opens the drawer by updating the `isDrawerOpen` state.
   - The `CreateIssue` component is displayed as a drawer, allowing the user to create a new issue.
   - Once the issue is created, the `handleIssueCreated` function can be used to fetch the updated list of issues.
