import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticles } from '../store/slice/articleSlice'
import { ArticleItem } from '../article-item/Article-item'
import './article-list.scss'
export const ArticleList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles(1))
  }, [])
  // console.log()

  const articles = useSelector((state) => {
    // console.log(state)
    // console.log(state.article.articles)
    return state.article.articles
  })
  // articles = [1, 3]
  console.log(articles)
  const arr = articles.map((res, i) => <ArticleItem key={res.key} props={res} />)
  console.log(arr)
  return <div className="article-list__wrapper">{arr}</div>
}
