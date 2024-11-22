import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { editArticle } from '../store/slice/articleSlice'
import { ArticleForm } from '../Article-form/Article-form'

const EditArticle = () => {
  let { slug } = useParams()
  // console.log(data)
  const dispatch = useDispatch()
  const onSubmit = (data) => {
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
  }
  return <ArticleForm title="Edit article" onSubmit={onSubmit} message="Edited successfully!" />
}
export { EditArticle }
