import { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { PostDataType } from '../api/posts'
import PostList from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { PostsStateType, getPosts, PostsActionType } from '../modules/posts'

export type PostThunkDispatchType = ThunkDispatch<PostDataType, PostsActionType<unknown>, AnyAction>

interface IRootStateType {
  posts: PostsStateType
}

function PostContainer(): JSX.Element | null {
  const { isLoading, data: posts, error } = useSelector(
    (state: IRootStateType) => state.posts.posts,
  )
  const dispatch = useDispatch<PostThunkDispatchType>()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if (isLoading && !posts) return <div>Loading..</div>
  if (error) return <div>Error..</div>
  if (!posts) return null

  return <PostList posts={posts} />
}

export default PostContainer
