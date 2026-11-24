 import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashbord/setting')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashbord/setting"!</div>
}
