import React from 'react'
import { Link } from 'react-router-dom'
import { PostDataType } from '../api/posts'

type PostListProps = {
  posts: PostDataType[] | PostDataType
}

function PostList({ posts }: PostListProps): JSX.Element {
  return (
    <ul>
      {Array.isArray(posts)
        ? posts.map((post) => (
            <li key={post.id}>
              <Link to={`/${post.id}`}>{post.title}</Link>
            </li>
          ))
        : ''}
    </ul>
  )
}

export default PostList
