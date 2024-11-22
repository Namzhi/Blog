import React, { useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { message, Popconfirm } from 'antd'

import { deleteArticle, fetchOneArticle, likeArticle, unlikeArticle } from '../store/slice/articleSlice'
import './article-post.scss'
import Spin from '../Spin'
import { useArticle } from '../hooks/use-article'
export default function ArticlePost() {
  let { slug } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const error = useSelector((state) => state.article.error)
  const article = useSelector((state) => {
    return state.article.oneArticle
  })
  console.log(error)
  const { author = 'no author', createdAt, description, favorited, favoritesCount, tagList, title, updatedAt } = article
  console.log(article)
  useEffect(() => {
    dispatch(fetchOneArticle(slug))
  }, [])
  function handleEdit() {
    navigate(`/articles/${slug}/edit`)
  }

  function handleDelete() {
    dispatch(deleteArticle(slug))
  }

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }
  function handleLike(e) {
    // console.log(e.target)
    // const heartIcon = e.target

    if (!favorited) {
      // heartIcon.classList.add('article-item__like-icon--clicked')
      dispatch(likeArticle(slug))
    } else {
      // heartIcon.classList.remove('article-item__like-icon--clicked')
      dispatch(unlikeArticle(slug))
    }
  }
  return (
    <>
      <Spin />
      {error && <div className={'error-message__article'}>{error}</div>}
      <div className="article-item__wrapper article-post__body">
        <div className="article-item__header">
          <div className="article-item__title-tags-wrapper">
            <div className="article-item__title" role="presentation">
              {title}
            </div>
            <div className="article-item__tags">{tagList ? tagList.map((el, i) => <li key={i}>{el}</li>) : null}</div>
          </div>
          <div
            // src={heart}
            // alt=""
            className={`article-item__like-icon ${favorited ? 'article-item__like-icon--clicked' : null}`}
            onClick={handleLike}
            role="presentation"
          />
          <div className="article-item__likes" role="presentation">
            {favoritesCount}
            {/*{propsFavcount}*/}
          </div>

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
