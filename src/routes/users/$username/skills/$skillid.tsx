import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$username/skills/$skillid')({
  component: RouteComponent,
})

function RouteComponent() {

  const {username , skillid} = Route.useParams()
  return (
  <div>
   <p>
    username : {username}
   </p>
    <p>
      skill : {skillid}
    </p>
  
  </div>
  )
}
