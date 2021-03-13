import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostDetail from '../components/PostDetail'
import { getPost, PostsStateType } from '../modules/posts'
import { PostThunkDispatchType } from './PostContainer'

interface IRootStateType {
  posts: PostsStateType
}

function PostDetailContainer() {
  const id = useParams<{ id: string }>().id
  const postId = Number(id)

  const { isLoading, data: post, error } = useSelector((state: IRootStateType) => state.posts.post)
  const dispatch: PostThunkDispatchType = useDispatch()

  useEffect(() => {
    dispatch(getPost(postId))
  }, [dispatch, postId])

  if (isLoading) return <div>Loading..</div>
  if (error) return <div>error</div>
  if (!post) return null

  return <PostDetail post={post} />
}

export default PostDetailContainer
