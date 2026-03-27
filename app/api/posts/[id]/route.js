import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

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

export async function GET(request, { params }) {
  const { id } = await params
  const posts = await readPosts()
  const post = posts.find(p => p.id === id)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(request, { params }) {
  const { id } = await params
  const body = await request.json()
  const posts = await readPosts()
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  posts[index] = {
    ...posts[index],
    title: body.title ?? posts[index].title,
    content: body.content ?? posts[index].content,
    excerpt: body.excerpt ?? posts[index].excerpt,
    published: body.published ?? posts[index].published,
    updatedAt: new Date().toISOString(),
  }

  await writePosts(posts)
  return NextResponse.json(posts[index])
}

export async function DELETE(request, { params }) {
  const { id } = await params
  const posts = await readPosts()
  const filtered = posts.filter(p => p.id !== id)
  if (filtered.length === posts.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  await writePosts(filtered)
  return NextResponse.json({ success: true })
}
