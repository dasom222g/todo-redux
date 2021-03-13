import React from 'react'
import { Link } from 'react-router-dom'
import { PostDataType } from '../api/posts'

type PostListProps = {
  posts: PostDataType[]
}

function PostList({ posts }: PostListProps) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
