// frontend/__tests__/proxy.test.ts
// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '@/proxy'

// Creating web connection to use for simpler routing
const request = (path: string, session?: string) => {
  const req = new NextRequest(new URL(`http://localhost:3000${path}`))
  if (session) req.cookies.set('__session', session)
  return req
}

// Used to test where on website we are
const location = (res: Response) => {
  const loc = res.headers.get('location')
  return loc ? new URL(loc) : null
}

// Testing to see what happens with logged out user
describe('proxy — logged out', () => {
  it.each(['/dashboard', '/profile', '/settings'])('redirects %s to signin', (path) => {
    const res = proxy(request(path))

    expect(res.status).toBe(307)
    expect(location(res)!.pathname).toBe('/auth/signin')
  })

  it('if in ?redirect= in URL redirects back correctly to root page', () => {
    const res = proxy(request('/dashboard'))

    // Needed to make sure redirect path is going to the right root page
    expect(location(res)!.searchParams.get('redirect')).toBe('/dashboard')
  })

  it('if in ?redirect= in URL redirects back correctly to a nested page', () => {
    const res = proxy(request('/dashboard/reports'))

    // Needed to make sure redirect path is not going to jus the right root page but to the right nested in the right root page
    expect(location(res)!.searchParams.get('redirect')).toBe('/dashboard/reports')
  })

  /*
    NEXT TWO IF FAIL MEANS SOMETHING IS WRONG WITH AUTHENTICATION SETUP
    These pages should be accessible no matter what
  */
  it('leaves auth routes alone', () => {
    expect(location(proxy(request('/auth/signin')))).toBeNull()
    expect(location(proxy(request('/auth/signup')))).toBeNull()
  })

  it('leaves public routes alone', () => {
    expect(location(proxy(request('/')))).toBeNull()
    expect(location(proxy(request('/about')))).toBeNull()
  })
})

describe('proxy — logged in', () => {
    // Titled FAKE_COOKIE due to the fact that proxy here will accept any spoofed cookie
    const FAKE_COOKIE = 'any-non-empty-value'

    it.each(['/dashboard', '/profile', '/settings'])('allows %s', (path) => {
        expect(location(proxy(request(path, FAKE_COOKIE)))).toBeNull()
    })

    it.each(['/auth/signin', '/auth/signup'])('bounces %s to the dashboard', (path) => {
        const res = proxy(request(path, FAKE_COOKIE))

        expect(res.status).toBe(307)
        expect(location(res)!.pathname).toBe('/dashboard')
    })

    it('highlighting lack of due dilligence done by proxy check for fake cookies', () => {
        // This only works because proxy does not check to see if cookies are authentic itself
        //Potential: New testing file for firebase itself and all of its methods would be needed
        // Along with then a new auth redirect test file uisng firebase
        expect(location(proxy(request('/dashboard', 'the-fakest-cookie')))).toBeNull()
    })
})