import React, { useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { message, Popconfirm } from 'antd'
import { format } from 'date-fns'

import { deleteArticle, deleteError, fetchOneArticle, likeArticle, unlikeArticle } from '../store/slice/articleSlice'
import './article-post.scss'
import Spin from '../Spin'

export default function ArticlePost() {
  let { slug } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const error = useSelector((state) => state.article.error)
  const isDeleted = useSelector((state) => state.article.isDeleted)
  const article = useSelector((state) => {
    return state.article.oneArticle
  })
  const isAuth = useSelector((state) => !!state.user.token)
  const { author = 'no author', createdAt, favorited, favoritesCount, tagList, title } = article
  useEffect(() => {
    dispatch(fetchOneArticle(slug))
  }, [dispatch, slug])
  function handleEdit() {
    navigate(`/articles/${slug}/edit`)
  }
  useEffect(() => {
    dispatch(fetchOneArticle(slug))
  }, [dispatch, slug])
  function handleDelete() {
    dispatch(deleteArticle(slug))
    if (!isAuth) {
      navigate('/login')
    }
    setTimeout(() => {
      dispatch(deleteError())
    }, 2000)
  }

  const cancel = () => {
    message.error('Click on No')
  }
  function handleLike() {
    if (!favorited) {
      dispatch(likeArticle(slug))
    } else {
      dispatch(unlikeArticle(slug))
    }
  }
  return (
    <>
      <Spin />
      {error && <div className={'error-message__article'}>{error}</div>}
      {isDeleted ? (
        <div className={'error-message__article'}>Deleted Successfully</div>
      ) : (
        <div className="article-item__wrapper article-post__body">
          <div className="article-item__header">
            <div className="article-item__title-tags-wrapper">
              <div className="article-item__title" role="presentation">
                {title}
              </div>
              <div className="article-item__tags">{tagList ? tagList.map((el, i) => <li key={i}>{el}</li>) : null}</div>
            </div>
            <div
              className={`article-item__like-icon ${favorited ? 'article-item__like-icon--clicked' : null}`}
              onClick={handleLike}
              role="presentation"
            />
            <div className="article-item__likes" role="presentation">
              {favoritesCount}
            </div>

            <div className="article-item__profile">
              <div className="article-item__name">{author.username}</div>
              <div className="article-item__date">
                {createdAt ? format(createdAt, 'MMMM' + ' dd, yyyy') : createdAt}
              </div>
              <div className="article-item__photo">
                <img src={author.image} alt="profile avatar" className="" />
              </div>
            </div>
          </div>
          <div className="article-post__description-button-wrapper">
            <div className="article-item__description ">{article.description}</div>
            <div className="article-post__button-wrapper">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={handleDelete}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button className="article-post__delete">Delete</button>
              </Popconfirm>

              <button className="article-post__edit" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
          <div className="article-post__body">
            <Markdown>{article.body}</Markdown>
          </div>
        </div>
      )}
    </>
  )
}
