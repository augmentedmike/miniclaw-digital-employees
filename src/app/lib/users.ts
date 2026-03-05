import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'

const USERS_FILE = path.join(process.cwd(), '.data/users.json')

// Ensure .data directory exists
function ensureDataDir() {
  const dir = path.dirname(USERS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Load users from file
function loadUsers(): Map<string, any> {
  ensureDataDir()
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE, 'utf-8')
    const users = JSON.parse(data)
    return new Map(Object.entries(users))
  }
  return new Map()
}

// Save users to file
function saveUsers(users: Map<string, any>) {
  ensureDataDir()
  const data = Object.fromEntries(users)
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2))
}

export function createUser(email: string, password: string, companyName: string) {
  const users = loadUsers()
  
  if (users.has(email)) {
    throw new Error('User already exists')
  }

  const userId = randomUUID()
  const user = {
    id: userId,
    email,
    companyName,
    password: password, // In production: hash this!
    createdAt: new Date().toISOString(),
    employees: [],
    knowledgeBase: [],
    integrations: {},
  }

  users.set(email, user)
  saveUsers(users)
  
  return user
}

export function findUserByEmail(email: string) {
  const users = loadUsers()
  return users.get(email)
}

export function findUserById(userId: string) {
  const users = loadUsers()
  for (const user of users.values()) {
    if (user.id === userId) {
      return user
    }
  }
  return null
}

export function updateUser(email: string, updates: Partial<any>) {
  const users = loadUsers()
  const user = users.get(email)
  
  if (!user) {
    throw new Error('User not found')
  }

  const updated = { ...user, ...updates }
  users.set(email, updated)
  saveUsers(users)
  
  return updated
}

export function createSessionToken(userId: string, email: string): string {
  const token = Buffer.from(JSON.stringify({
    userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  })).toString('base64')
  return token
}

export function verifySessionToken(token: string): { userId: string; email: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null // Token expired
    }
    return { userId: decoded.userId, email: decoded.email }
  } catch {
    return null
  }
}
