import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  // TODO: Implement Auth0 or similar authentication
  // For now, return a placeholder response

  return NextResponse.json(
    {
      success: true,
      message: 'Login endpoint ready for Auth0 integration',
      email,
    },
    { status: 200 }
  )
}
