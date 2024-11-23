import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link as NavLink, useSearchParams } from 'react-router-dom'
import { Pagination, PaginationItem, Stack } from '@mui/material'
import uniqid from 'uniqid'

import { fetchArticles } from '../store/slice/articleSlice'
import { ArticleItem } from '../Article-item/Article-item'
import './article-list.scss'
import Spin from '../Spin'
import { useArticle } from '../hooks/use-article'

export const ArticleList = () => {
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()
  const initialPage = parseInt(searchParams.get('page')) || 1
  const [page, setPage] = useState(initialPage)
  useEffect(() => {
    dispatch(fetchArticles(page))
  }, [dispatch, page])
  const articles = useSelector((state) => {
    return state.article.articles
  })

  const { isLoading, error, articlesCount } = useArticle()
  const pageQty = Math.floor(articlesCount / 5) + 1
  const arr = articles.map((res, i) => <ArticleItem key={uniqid()} props={res} index={i} />)
  return (
    <div className="article-list__wrapper">
      {error && <div className={'error-message'}>{error}</div>}
      {isLoading ? <Spin /> : <ul className="article-list">{arr}</ul>}

      {!!pageQty && (
        <Stack alignItems="center">
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => {
              setPage(num)
            }}
            showFirstButton
            showLastButton
            sx={{ marginY: 3, marginX: 'auto' }}
            color="primary"
            shape="rounded"
            renderItem={(item) => <PaginationItem component={NavLink} to={`/?page=${item.page}`} {...item} />}
          />
        </Stack>
      )}
    </div>
  )
}
