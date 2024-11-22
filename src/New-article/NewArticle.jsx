// eslint-disable-next-line import/order
import React, { useEffect } from 'react'

// import { ArticleForm } from './Article-form'
import { useDispatch } from 'react-redux'

import { ArticleForm } from '../Article-form/Article-form'
import { createArticle } from '../store/slice/articleSlice'

const NewArticle = () => {
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log(data)

    dispatch(
      createArticle({
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tags ? data.tags.filter((el) => !!el) : [],
        },
      })
    )
  }

  return <ArticleForm title="Create article" onSubmit={onSubmit} nullValues={true} message="Article is created" />
}
export { NewArticle }
