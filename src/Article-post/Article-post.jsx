import React, { useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, message, Popconfirm } from 'antd'

import { deleteArticle, fetchOneArticle } from '../store/slice/articleSlice'
import './article-post.scss'
import Spin from '../Spin'
export default function ArticlePost() {
  let { slug } = useParams()
  // console.log(useParams())
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchOneArticle(slug))
  }, [])
  const dispatch = useDispatch()
  const error = useSelector((state) => state.article.error)
  const article = useSelector((state) => {
    return state.article.oneArticle
  })
  console.log(error)
  const { author = 'no author', createdAt, description, favorited, favoritesCount, tagList, title, updatedAt } = article
  console.log(article)

  function handleEdit() {
    navigate(`/articles/${slug}/edit`)
  }

  function handleDelete() {
    dispatch(deleteArticle(slug))
  }
  const confirm = (e) => {
    console.log(e)
    message.success('Click on Yes')
  }
  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }
  return (
    <>
      <Spin />
      {error && <div className={'error-message__article'}>{error}</div>}
      <div className="article-item__wrapper article-post__body">
        <div className="article-item__header">
          <div className="article-item__title-tags-wrapper">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div className="article-item__title" role="presentation">
              {title}
            </div>
            <div className="article-item__tags">
              {tagList
                ? // <ul>
                  tagList.map((el, i) => <li key={i}>{el}</li>)
                : // </ul>
                  null}
            </div>
          </div>
          <div className="article-item__likes">{favoritesCount}</div>

          <div className="article-item__profile">
            <div className="article-item__name">{author.username}</div>
            <div className="article-item__date">{createdAt}</div>
            <div className="article-item__photo">
              <img src={author.image} alt="profile avatar" className="" />
            </div>
          </div>
        </div>
        <div className="article-item__description ">{article.description}</div>
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
        <div className="article-item__description ">
          <Markdown>{article.body}</Markdown>
        </div>
      </div>
    </>
  )
}
