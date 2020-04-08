import React from 'react'
import Link from 'next/link'

import fs from 'fs'

export default ({blogs}) => {
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <Link key={blog} href={`/blogs/${blog}`}>
            <a>{blog}</a>
          </Link>
        )
      })}
    </div>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync('blogs')
  return {
    props: {
      blogs: files.map((filename) => filename.replace('.md', ''))
    }
  }
}