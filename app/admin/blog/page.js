'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
  }, [])

  async function deletePost(id) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    setPosts(posts.filter(p => p.id !== id))
  }

  async function togglePublish(post) {
    const updated = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    }).then(r => r.json())
    setPosts(posts.map(p => p.id === updated.id ? updated : p))
  }

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav-logo">DushiMarketing</Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/admin/blog" className="active">Admin</Link>
        </nav>
      </header>

      <div className="admin-hero">
        <span className="eyebrow">Admin</span>
        <div className="admin-hero-row">
          <h1>Blog Posts</h1>
          <Link href="/admin/blog/new" className="btn btn-dark">+ New post</Link>
        </div>
      </div>

      <div className="admin-list wrap">
        {loading && <p className="admin-empty">Loading…</p>}

        {!loading && posts.length === 0 && (
          <p className="admin-empty">No posts yet. <Link href="/admin/blog/new">Create your first post →</Link></p>
        )}

        {!loading && posts.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>
                    <span className="admin-post-title">{post.title}</span>
                    <span className="admin-post-slug">/{post.slug}</span>
                  </td>
                  <td>
                    <button
                      className={`admin-status-btn${post.published ? ' published' : ''}`}
                      onClick={() => togglePublish(post)}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="admin-date">
                    {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="admin-actions">
                    <Link href={`/admin/blog/${post.id}/edit`} className="admin-action-link">Edit</Link>
                    <Link href={`/blog/${post.slug}`} className="admin-action-link" target="_blank">View</Link>
                    <button className="admin-action-link danger" onClick={() => deletePost(post.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <Link href="/" className="nav-logo">DushiMarketing</Link>
            <p>Honest affiliate marketing.</p>
          </div>
          <nav className="footer-nav">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className="footer-base">© 2026 DushiMarketing</div>
      </footer>
    </>
  )
}
