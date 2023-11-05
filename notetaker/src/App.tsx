
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useEffect } from 'react'
import { useQueue } from './pwa/services/request-queue';

function App() {

  useEffect(() => {
    const requestQueue = useQueue();

    requestQueue.sync();


  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
