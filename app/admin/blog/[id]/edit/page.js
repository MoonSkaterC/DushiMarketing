'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../../../../components/Editor'), { ssr: false })

export default function EditPost() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!id) return
    fetch(`/api/posts/${id}`)
      .then(r => r.json())
      .then(post => {
        setTitle(post.title)
        setExcerpt(post.excerpt || '')
        setContent(post.content)
        setPublished(post.published)
        setLoading(false)
      })
  }, [id])

  const handleContentChange = useCallback((html) => {
    setContent(html)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required.'); return }
    if (!content || content === '<p></p>') { setError('Content is required.'); return }
    setError('')
    setSaving(true)
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, content, published }),
      })
      if (!res.ok) throw new Error('Save failed')
      router.push('/admin/blog')
    } catch {
      setError('Failed to save post. Please try again.')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <>
        <header className="nav">
          <Link href="/" className="nav-logo">DushiMarketing</Link>
        </header>
        <div className="admin-hero"><p className="admin-empty">Loading…</p></div>
      </>
    )
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
          <h1>Edit Post</h1>
          <Link href="/admin/blog" className="btn btn-ghost">← Back</Link>
        </div>
      </div>

      <div className="admin-editor-wrap wrap">
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-field">
            <label className="form-label" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Post title"
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="excerpt">Excerpt <span className="form-optional">(optional)</span></label>
            <input
              id="excerpt"
              type="text"
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Short description shown in the blog list"
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Content</label>
            <Editor
              key={content && !loading ? 'loaded' : 'loading'}
              content={content}
              onChange={handleContentChange}
              placeholder="Start writing your post…"
            />
          </div>

          <div className="form-footer">
            {error && <p className="form-error">{error}</p>}
            <div className="form-footer-row">
              <label className="publish-toggle">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={e => setPublished(e.target.checked)}
                />
                <span>Published</span>
              </label>
              <button type="submit" className="btn btn-dark" disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        </form>
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
