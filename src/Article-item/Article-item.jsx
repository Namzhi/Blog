import React from 'react'
// eslint-disable-next-line import/order
import { Link } from 'react-router-dom'

import './article-item.scss'
import { useDispatch } from 'react-redux'

import { fetchOneArticle } from '../store/slice/articleSlice'
export const ArticleItem = (props) => {
  const { author, createdAt, description, favorited, favoritesCount, slug, tagList, title, updatedAt } = props.props

  const dispatch = useDispatch()

  // console.log(author)
  return (
    <div className="article-item__wrapper">
      <div className="article-item__header">
        <div className="article-item__title-tags-wrapper">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div className="article-item__title" role="presentation">
            <Link to={`/articles/${slug}`}>{title}</Link>
          </div>
          <div className="article-item__tags">
            {/*<ul>*/}
            {tagList.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
            {/*</ul>*/}
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
      <div className="article-item__description">{description}</div>
    </div>
  )
}
