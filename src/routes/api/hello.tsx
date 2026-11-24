import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: async () => {
        console.log('Someone hit from public api ')
        return Response.json({ message: 'Hello from the server!' },{
          headers:{
            "Cache-Control" : "public, max-age=60",
            "Access-Control-Allow-Origin" : "*",
          }
        })
      }
    }
  }
})

