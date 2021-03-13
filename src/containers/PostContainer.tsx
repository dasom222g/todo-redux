import React, { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { PostDataType } from '../api/posts'
import PostList from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { PostsStateType, getPosts } from '../modules/posts'

export type PostThunkDispatchType = ThunkDispatch<PostDataType, any, AnyAction>

interface IRootStateType {
  posts: PostsStateType
}

function PostContainer() {
  const { isLoading, data: posts, error } = useSelector(
    (state: IRootStateType) => state.posts.posts,
  )
  const dispatch = useDispatch<PostThunkDispatchType>()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if (isLoading) return <div>Loading..</div>
  if (error) return <div>Error..</div>
  if (!posts) return null

  return <PostList posts={posts} />
}

export default PostContainer
