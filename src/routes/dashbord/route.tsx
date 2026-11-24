import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashbord')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <aside>
        sidebar
      </aside>
      <section>
        <Outlet />
      </section>
    </main>
  )
}
