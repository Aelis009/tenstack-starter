import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashbord/sklills')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashbord/sklills"!</div>
}
