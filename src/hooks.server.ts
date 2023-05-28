import type { Handle } from '@sveltejs/kit'
import { getCurrentUser } from '$lib/api/auth'

const handle: Handle = async ({ event, resolve }) => {
  const authCookie = event.cookies.get('token')

  if (authCookie) {
    // Remove Bearer prefix
    const jwtUser = authCookie.split(' ')[1]

    try {
      if (typeof jwtUser !== 'string') {
        throw new Error('Something went wrong')
      }

      const user = await getCurrentUser(authCookie)
      if (!user) {
        throw new Error('User not found')
      }

      const sessionUser = {
        id: user.id,
        email: user.email
      }

      event.locals.user = sessionUser
    } catch (error) {
      console.error(error)
    }
  }

  return await resolve(event)
}

export { handle }
