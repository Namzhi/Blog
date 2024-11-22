import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { editArticle } from '../store/slice/articleSlice'
import { useArticle } from '../hooks/use-article'
import { useAuth } from '../hooks/use-auth'
import './Article-form.scss'
export const ArticleForm = ({ title, onSubmit, message, nullValues }) => {
  let { slug } = useParams()
  console.log(useParams())
  useEffect(() => {}, [])

  const { isAuth } = useAuth()
  const { titleDefault, description, body, tags: tagsDefault, errorMessage, isSave, isCreated } = useArticle()
  const [tags, setTags] = useState(nullValues ? [] : tagsDefault)
  console.log(tagsDefault)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: nullValues ? '' : titleDefault,
      description: nullValues ? '' : description,
      body: nullValues ? '' : body,
      tags: nullValues ? '' : tagsDefault,
    },
  })

  const handleAddTag = () => {
    setTags([...tags, ''])
  }

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, idx) => idx !== index))
  }

  return (
    <div className="register-form__wrapper article-form__wrapper">
      <h1 className="register-form__title">{title}</h1>
      {!isAuth ? <Navigate to={'/login'} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={'register-form__label'}>
          <span className="article-form__input-title">Title</span>
          <input
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Your title needs to be at least 3 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your title cannot be more than 40 characters long',
              },
            })}
            className={errors?.title?.message ? 'register-form__error-input' : 'register-form__input'}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </label>
        <label className={'register-form__label'}>
          <span className="article-form__input-title">Short description</span>
          <input
            type="text"
            placeholder="Description"
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
            className={`${errors?.username?.message ? 'register-form__error-input' : 'register-form__input'} article-form__input`}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </label>
        <label className={'register-form__label'}>
          <span className="article-form__input-title">Text</span>
          <textarea
            placeholder="Text"
            {...register('body', {
              // required: 'Body is required',
            })}
            className="register-form__input article-form__text"
          />
          {errors.body && <p>{errors.body.message}</p>}
        </label>

        <label className={'register-form__label'}>
          <span className="article-form__input-title">Tags</span>
          {tags.map((tag, index) => (
            <div key={index} className="article-form__tag-wrapper">
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
                className={'article-form__tag'}
              />
              {errors.tags?.[index] && <p>{errors.tags[index].message}</p>}

              <button type="button" className="article-form__button-delete" onClick={() => handleDeleteTag(index)}>
                Delete
              </button>
            </div>
          ))}
          <button className="article-form__button-add" type="button" onClick={handleAddTag}>
            Add Tag
          </button>
        </label>
        <button type="submit" className="register-form__button register-form__button--margin-top">
          Send
        </button>
        {errorMessage && (
          <p role="alert" className="register-form__success article-form__error-edit">
            {errorMessage}
          </p>
        )}
        {isSave && !nullValues && <p className="register-form__success">{message}</p>}
        {isCreated && nullValues && <p className="register-form__success">{message}</p>}
      </form>
    </div>
    // <div className="register-form__wrapper article-form__wrapper">
    //   <h1 className="register-form__title">{title}</h1>
    //   {!isAuth ? <Navigate to={'/login'} /> : null}
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <label className={'register-form__label'}>
    //       <span className="article-form__input-title">Title</span>
    //       <input
    //         type="text"
    //         placeholder="Title"
    //         {...register('title', {
    //           required: 'Title is required',
    //           minLength: {
    //             value: 3,
    //             message: 'Your title needs to be at least 3 characters',
    //           },
    //           maxLength: {
    //             value: 40,
    //             message: 'Your title cannot be more than 40 characters long',
    //           },
    //         })}
    //         className={errors?.title?.message ? 'register-form__error-input' : 'register-form__input'}
    //       />
    //       {errors.title && <p>{errors.title.message}</p>}
    //     </label>
    //     <label className={'register-form__label'}>
    //       <span className="article-form__input-title">Short description</span>
    //       <input
    //         type="text"
    //         placeholder="Description"
    //         {...register('description', {
    //           minLength: {
    //             value: 3,
    //             message: 'Your description needs to be at least 3 characters',
    //           },
    //           maxLength: {
    //             value: 40,
    //             message: 'Your description cannot be more than 40 characters long',
    //           },
    //         })}
    //         className={`${errors?.username?.message ? 'register-form__error-input' : 'register-form__input'} article-form__input`}
    //       />
    //       {errors.description && <p>{errors.description.message}</p>}
    //     </label>
    //     <label className={'register-form__label'}>
    //       <span className="article-form__input-title">Text</span>
    //       <textarea
    //         placeholder="Text"
    //         {...register('body', {
    //           // required: 'Body is required',
    //         })}
    //         className="register-form__input article-form__text"
    //       />
    //       {errors.body && <p>{errors.body.message}</p>}
    //     </label>
    //
    //     <label className={'register-form__label'}>
    //       <span className="article-form__input-title">Tags</span>
    //       {tags.map((tag, index) => (
    //         <div key={index} className="article-form__tag-wrapper">
    //           <input
    //             type="text"
    //             placeholder={`Tag ${index + 1}`}
    //             {...register(`tags.${index}`, {
    //               minLength: {
    //                 value: 1,
    //                 message: 'Your tag needs to be at least 1 character',
    //               },
    //               maxLength: {
    //                 value: 40,
    //                 message: 'Your tag cannot be more than 40 characters long',
    //               },
    //             })}
    //             className={'article-form__tag'}
    //           />
    //           {errors.tags?.[index] && <p>{errors.tags[index].message}</p>}
    //
    //           <button type="button" className="article-form__button-delete"
    //                   onClick={() => handleDeleteTag(index)}>
    //             Delete
    //           </button>
    //         </div>
    //       ))}
    //       <button className="article-form__button-add" type="button"
    //               onClick={handleAddTag}>
    //         Add Tag
    //       </button>
    //     </label>
    //     <button type="submit"
    //             className="register-form__button register-form__button--margin-top">
    //       Send
    //     </button>
    //   </form>
    // </div>
  )
}
// (
//   <div>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         type="text"
//         placeholder="title"
//         {...register('title', {
//           minLength: {
//             value: 3,
//             message: 'Your title needs to be at least 3 characters',
//           },
//           maxLength: {
//             value: 40,
//             message: 'Your title cannot be more than 40 characters long',
//           },
//         })}
//       />
//       {errors.title && <p>{errors.title.message}</p>}
//       <input
//         type="text"
//         placeholder="description"
//         {...register('description', {
//           minLength: {
//             value: 3,
//             message: 'Your description needs to be at least 3 characters',
//           },
//           maxLength: {
//             value: 40,
//             message: 'Your description cannot be more than 40 characters long',
//           },
//         })}
//       />
//       {errors.description && <p>{errors.description.message}</p>}
//
//       <textarea
//         placeholder="body"
//         {...register('body', {
//           // required: 'Body is required',
//         })}
//       />
//       {errors.body && <p>{errors.body.message}</p>}
//
//       {tags.map((tag, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             placeholder={`Tag ${index + 1}`}
//             {...register(`tags.${index}`, {
//               minLength: {
//                 value: 1,
//                 message: 'Your tag needs to be at least 1 character',
//               },
//               maxLength: {
//                 value: 40,
//                 message: 'Your tag cannot be more than 40 characters long',
//               },
//             })}
//           />
//           {errors.tags?.[index] && <p>{errors.tags[index].message}</p>}
//           <button type="button" onClick={() => handleDeleteTag(index)}>
//             Delete
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddTag}>
//         Add Tag
//       </button>
//       <button type="submit">{title}</button>
//     </form>
//   </div>
// )
