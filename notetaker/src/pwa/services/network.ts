export async function isOnline(): Promise<boolean>{

  return fetch('/api/ping', {
    cache: 'no-store',
  }).then((res) => res.status !== 500)
  .catch(err => false);

}