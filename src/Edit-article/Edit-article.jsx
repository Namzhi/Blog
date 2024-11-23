import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { editArticle } from '../store/slice/articleSlice'
import { ArticleForm } from '../Article-form/Article-form'

const EditArticle = () => {
  let { slug } = useParams()
  const dispatch = useDispatch()
  const onSubmit = useCallback(
    (data) => {
      dispatch(
        editArticle({
          article: {
            title: data.title,
            slug: slug,
            description: data.description,
            body: data.body,
            tagList: data.tags.filter((el) => !!el),
          },
        })
      )
    },
    [dispatch, slug]
  )
  return <ArticleForm title="Edit article" onSubmit={onSubmit} message="Edited successfully!" />
}
export { EditArticle }
