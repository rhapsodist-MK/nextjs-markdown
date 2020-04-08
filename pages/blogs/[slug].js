import React from 'react'
import matter from 'gray-matter'
import marked from 'marked'

import fs from 'fs'
import path from 'path'

export default ({htmlString, data}) => {
  return (
    <>
      <div>contents below</div>
      <div>
        {data.title}
      </div>
      <div dangerouslySetInnerHTML={{__html: htmlString}} />
    </>
  )
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync('blogs')
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({params: {slug}}) => {
  const markdownWithMetadata = fs.readFileSync(path.join('blogs', `${slug}.md`)).toString()
  const parsedMarkdown = matter(markdownWithMetadata)

  const htmlString = marked(parsedMarkdown.content)

  return { props: { 
    htmlString, 
    data: parsedMarkdown.data
  }}
}