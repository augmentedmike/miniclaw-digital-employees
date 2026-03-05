import { NextRequest, NextResponse } from 'next/server'
import { createUser, createSessionToken } from '@/app/lib/users'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, companyName } = body

    // Validate input
    if (!email || !password || !companyName) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, companyName' },
        { status: 400 }
      )
    }

    // Create user
    const user = createUser(email, password, companyName)
    const sessionToken = createSessionToken(user.id, email)

    const response = NextResponse.json(
      {
        success: true,
        message: 'Signup successful',
        user: { id: user.id, email: user.email, companyName: user.companyName },
      },
      { status: 201 }
    )

    // Set session cookie
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error: any) {
    if (error.message === 'User already exists') {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 500 }
    )
  }
}
