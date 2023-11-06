
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useEffect } from 'react'
import { useQueue } from './pwa/services/request-queue';
import { Group, Loader, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

function App() {

  const [showOverlay, {open: openOverlay, close: closeOverlay}] = useDisclosure(true);
  useEffect(() => {
    const requestQueue = useQueue();

    // requestQueue.sync();

    setTimeout(() => {

      const loadingSync = notifications.show({
        title: (
          <Group justify='space-between'>
            Syncing offline data...
            <Loader ml="16" size="sm"></Loader>
          </Group>
        ),
        message: '',
        withCloseButton: false,
        autoClose: false,
      });

      requestQueue.sync()
        .catch(() => {
          return false;
        })
        .then((success) => {
          const color = success ? 'blue' : 'red';

          const title = success ? 'Sync completed' : 'Sync failed';

          notifications.hide(loadingSync);

          notifications.show({
            title,
            message: '',
            color,
          });

          closeOverlay();
        })

    }, 2000);


  }, []);

  return (
    <>
      <LoadingOverlay
        visible={showOverlay}
        zIndex={1000}
        overlayProps={{radius: 'sm', 'blur': 2}}
        loaderProps={{color: 'pink', type: 'bars'}}
      />
      {!showOverlay && <RouterProvider router={router}></RouterProvider>}
      
    </>
  )
}

export default App
