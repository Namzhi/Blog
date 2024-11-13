import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOneArticle } from '../store/slice/articleSlice'
import './article-post.scss'
import Spin from '../Spin'
export default function ArticlePost() {
  let { slug } = useParams()
  const dispatch = useDispatch()
  const error = useSelector((state) => state.article.error)
  console.log(error)
  useEffect(() => {
    dispatch(fetchOneArticle(slug))
  }, [])
  const article = useSelector((state) => {
    return state.article.oneArticle
  })
  console.log(article)
  return (
    <>
      <Spin />
      {error && <div className={'error-message__article'}>{error}</div>}
      <div>{article.body}</div>
    </>
  )
}
