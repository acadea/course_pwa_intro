
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    // send GET to /api/notes
    fetch('/api/notes', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('res is', res);
      })


  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
