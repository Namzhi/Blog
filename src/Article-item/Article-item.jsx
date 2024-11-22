import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './article-item.scss'
import { useDispatch, useSelector } from 'react-redux'

import heart from '../assets/images/heart.svg'
import { likeArticle, unlikeArticle } from '../store/slice/articleSlice'

export const ArticleItem = ({ props, index }) => {
  const { author, createdAt, description, slug, tagList, title, updatedAt, favorited, favoritesCount } = props
  // const {  } = useSelector
  const dispatch = useDispatch()
  // const updatedArt = useSelector((state) => state.article.updatedArticle)

  // const article = useSelector((state) => state.article.articles[index])
  // const { favorited, favoritesCount } = article
  // const heartIcon = document.querySelector('.article-item__like-icon')
  function handleLike(e) {
    // console.log(e.target)
    // const heartIcon = e.target

    if (!favorited) {
      // heartIcon.classList.add('article-item__like-icon--clicked')
      dispatch(likeArticle(slug))
    } else if (favorited) {
      // heartIcon.classList.remove('article-item__like-icon--clicked')
      dispatch(unlikeArticle(slug))
    }
  }
  // function handleUnlike() {
  //   dispatch(unlikeArticle(slug))
  // }

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
            <div className="article-item__likes">
              {favoritesCount}
              {/*{propsFavcount}*/}
            </div>
          </div>
          <div className="article-item__tags">
            {tagList.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </div>
        </div>

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
