import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostDetail from '../components/PostDetail'
import { postsReducerUtils } from '../lib/asyncUtils'
import { getPost, PostsStateType } from '../modules/posts'
import { PostThunkDispatchType } from './PostContainer'

interface IRootStateType {
  posts: PostsStateType
}

function PostDetailContainer(): JSX.Element | null {
  const id = useParams<{ id: string }>().id
  const postId = Number(id)

  const { isLoading, data, error } = useSelector(
    (state: IRootStateType) => state.posts.post[id] || postsReducerUtils.initial()
  )
  const dispatch: PostThunkDispatchType = useDispatch()

  useEffect(() => {
    if (data) return // data가 있을경우 데이터 요청 안함
    dispatch(getPost(postId))
  }, [dispatch, postId, data])

  if (isLoading && !data) return <div>Loading..</div>
  if (error) return <div>error</div>
  if (!data) return null

  return <PostDetail post={data} />
}

export default PostDetailContainer
