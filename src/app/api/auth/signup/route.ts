import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password, companyName } = body

  // TODO: Implement Auth0 signup
  // For now, return a placeholder response

  return NextResponse.json(
    {
      success: true,
      message: 'Signup endpoint ready for Auth0 integration',
      email,
      companyName,
    },
    { status: 201 }
  )
}
