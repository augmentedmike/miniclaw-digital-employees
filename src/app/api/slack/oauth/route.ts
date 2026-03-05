import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')

  // TODO: Implement Slack OAuth exchange
  // 1. Exchange code for access token
  // 2. Store token in database
  // 3. Redirect to dashboard

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      success: true,
      message: 'Slack OAuth endpoint ready for integration',
      code,
      state,
    },
    { status: 200 }
  )
}
