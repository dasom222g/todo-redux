import { PostDataType } from '../api/posts'

type PostDetailProps = {
  post: PostDataType
}

function PostDetail({ post }: PostDetailProps) {
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  )
}

export default PostDetail
