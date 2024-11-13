import React from 'react'
import { Link } from 'react-router-dom'

import './article-item.scss'
export const ArticleItem = (props) => {
  const { author, createdAt, description, favorited, favoritesCount, slug, tagList, title, updatedAt } = props.props
  // console.log(author)
  return (
    <div className="article-item__wrapper">
      <div className="article-item__header">
        <div className="article-item__title-tags-wrapper">
          <div className="article-item__title">
            <Link to={`/articles/${slug}`}>{title}</Link>
          </div>
          <div className="article-item__tags">
            {tagList.map((el, i) => (
              <li key={i}>el</li>
            ))}
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
