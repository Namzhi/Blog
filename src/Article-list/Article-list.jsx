import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link as NavLink, useSearchParams } from 'react-router-dom'
import { Pagination, PaginationItem, TextField, Stack, Link } from '@mui/material'
import uniqid from 'uniqid'

import { fetchArticles } from '../store/slice/articleSlice'
import { ArticleItem } from '../Article-item/Article-item'
import './article-list.scss'
import Spin from '../Spin'

export const ArticleList = (props) => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const initialPage = parseInt(searchParams.get('page')) || 1
  const [page, setPage] = useState(initialPage)
  const articles = useSelector((state) => {
    return state.article.articles
  })
  const pageQty = useSelector((state) => {
    return Math.floor(state.article.articlesCount / 5) + 1
  })
  const error = useSelector((state) => state.article.error)

  // const [pageQty, setPageQty] = useState(1)
  useEffect(() => {
    // console.log(page)
    dispatch(fetchArticles(page))
  }, [page])

  const arr = articles.map((res, i) => <ArticleItem key={uniqid()} props={res} />)
  return (
    <div className="article-list__wrapper">
      <Spin />
      {error && <div className={'error-message'}>{error}</div>}

      <ul className="article-list">{arr}</ul>
      {!!pageQty && (
        <Pagination
          count={pageQty}
          page={page}
          onChange={(_, num) => {
            console.log(num)
            setPage(num)
          }}
          showFirstButton
          showLastButton
          sx={{ marginY: 3, marginX: 'auto' }}
          renderItem={(item) => <PaginationItem component={NavLink} to={`/?page=${item.page}`} {...item} />}
        />
      )}
    </div>
  )
}
