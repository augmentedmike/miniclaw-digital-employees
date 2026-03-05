import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, findUserById, updateUser } from '@/app/lib/users'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    // Get session token from cookie
    const sessionToken = request.cookies.get('session')?.value
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const session = verifySessionToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, role, context } = body

    // Validate input
    if (!name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: name, role' },
        { status: 400 }
      )
    }

    // Get user
    const user = findUserById(session.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create employee
    const employeeId = 'emp_' + randomUUID().substring(0, 8)
    const employee = {
      id: employeeId,
      name,
      role,
      context: context || '',
      status: 'initializing',
      createdAt: new Date().toISOString(),
      knowledgeBase: [],
      integrations: {},
    }

    // Add employee to user
    user.employees.push(employee)
    updateUser(session.email, user)

    return NextResponse.json(
      {
        success: true,
        message: 'Digital employee created',
        employee,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating employee:', error)
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    )
  }
}
