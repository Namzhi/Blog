import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { editProfile } from '../store/slice/userSlice'
import { createArticle, editArticle, fetchOneArticle } from '../store/slice/articleSlice'

export const FormArticleEdit = ({ title }) => {
  let { slug } = useParams()
  console.log(useParams())
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  // const [num, setNum] = useState([])
  const [tags, setTags] = useState([])

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: [],
    },
  })
  //
  // useEffect(() => {
  //   console.log('Updated tags:', tags)
  // }, [tags])

  const handleAddTag = () => {
    setTags([...tags, ''])
  }

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, idx) => idx !== index))
  }

  const onSubmit = (data) => {
    console.log(data)
    // setNum([...num, 1])

    dispatch(
      editArticle({
        article: {
          title: data.title,
          slug: slug,
          description: data.description,
          body: data.body,
          tagList: data.tags,
        },
      })
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="title"
          {...register('title', {
            minLength: {
              value: 3,
              message: 'Your title needs to be at least 3 characters',
            },
            maxLength: {
              value: 40,
              message: 'Your title cannot be more than 40 characters long',
            },
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <input
          type="text"
          placeholder="description"
          {...register('description', {
            minLength: {
              value: 3,
              message: 'Your description needs to be at least 3 characters',
            },
            maxLength: {
              value: 40,
              message: 'Your description cannot be more than 40 characters long',
            },
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <textarea
          placeholder="body"
          {...register('body', {
            // required: 'Body is required',
          })}
        />
        {errors.body && <p>{errors.body.message}</p>}

        {tags.map((tag, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Tag ${index + 1}`}
              {...register(`tags.${index}`, {
                minLength: {
                  value: 1,
                  message: 'Your tag needs to be at least 1 character',
                },
                maxLength: {
                  value: 40,
                  message: 'Your tag cannot be more than 40 characters long',
                },
              })}
            />
            {errors.tags?.[index] && <p>{errors.tags[index].message}</p>}
            <button type="button" onClick={() => handleDeleteTag(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTag}>
          Add Tag
        </button>
        <button type="submit">{title}</button>
      </form>
    </div>
  )
}
