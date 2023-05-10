import type { Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {

  const response = await resolve(event)
  response.headers.set('x-custom-header', 'potato')
  console.log("hooked")
  return response
}) satisfies Handle