import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/skills/$skillid')({
  component: RouteComponent,
})

function RouteComponent() {
  const { skillid } = Route.useParams()
  return <div>Hello "/skills : {skillid}"!</div>
}
