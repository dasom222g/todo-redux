import { PostDataType } from '../api/posts'

type PostDetailProps = {
  post: PostDataType | PostDataType[]
}

function PostDetail({ post }: PostDetailProps): JSX.Element {
  return (
    <>
      <h1>{!Array.isArray(post) ? post.title : ''}</h1>
      <p>{post.body}</p>
    </>
  )
}

export default PostDetail
