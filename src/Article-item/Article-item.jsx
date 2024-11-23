import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import './article-item.scss'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'

import { likeArticle, unlikeArticle } from '../store/slice/articleSlice'

// eslint-disable-next-line react/display-name
export const ArticleItem = memo(({ props }) => {
  const { author, createdAt, description, slug, tagList, title, favorited, favoritesCount } = props
  const dispatch = useDispatch()

  function handleLike() {
    if (!favorited) {
      dispatch(likeArticle(slug))
    } else if (favorited) {
      dispatch(unlikeArticle(slug))
    }
  }

  return (
    <div className="article-item__wrapper">
      <div className="article-item__header">
        <div className="article-item__title-tags-wrapper">
          <div className="article-item__title" role="presentation">
            <Link to={`/articles/${slug}`}>{title}</Link>
            <div
              className={`article-item__like-icon ${favorited ? 'article-item__like-icon--clicked' : null}`}
              onClick={handleLike}
              role="presentation"
            />
            <div className="article-item__likes">{favoritesCount}</div>
          </div>
          <div className="article-item__tags">
            {tagList.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </div>
        </div>

        <div className="article-item__profile">
          <div className="article-item__name">{author.username}</div>
          <div className="article-item__date">{format(createdAt, 'MMMM' + ' dd, yyyy')}</div>
          <div className="article-item__photo">
            <img src={author.image} alt="profile avatar" className="" />
          </div>
        </div>
      </div>
      <div className="article-item__description">{description}</div>
    </div>
  )
})
