import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json')

async function readPosts() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writePosts(posts) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2))
}

export async function GET() {
  const posts = await readPosts()
  return NextResponse.json(posts)
}

export async function POST(request) {
  const body = await request.json()
  const posts = await readPosts()

  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const now = new Date().toISOString()
  const post = {
    id: randomUUID(),
    slug,
    title: body.title,
    content: body.content,
    excerpt: body.excerpt || '',
    date: now,
    updatedAt: now,
    published: body.published ?? false,
  }

  posts.unshift(post)
  await writePosts(posts)

  return NextResponse.json(post, { status: 201 })
}
