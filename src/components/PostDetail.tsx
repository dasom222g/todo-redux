import { PostDataType } from '../api/posts'

type PostDetailProps = {
  post: PostDataType | PostDataType[]
}

function PostDetail({ post }: PostDetailProps): JSX.Element {
  return (
    <>
      <h1>{post.title}</h1>
      <p>{!Array.isArray(post) ? post.body : ''}</p>
    </>
  )
}

export default PostDetail
