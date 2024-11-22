import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/use-auth'
import { useProfile } from '../hooks/use-profile'
import { editProfile } from '../store/slice/userSlice'

export const EditProfile = ({ title }) => {
  const dispatch = useDispatch()

  const { isAuth, errorMessage } = useAuth() // Проверяем статус авторизации
  const { username, email, password, image, isSave } = useProfile()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: username,
      email: email,
      image: image,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    dispatch(
      editProfile({
        user: {
          email: data.email,
          username: data.username,
          bio: data.bio,
          image: data.image,
        },
      })
    )
  }
  return (
    <div className="register-form__wrapper">
      <h1 className="register-form__title">Edit Profile</h1>
      {!isAuth ? <Navigate to={'/login'} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={'register-form__label'}>
          Username
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
              minLength: {
                value: 3,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Your password cannot be more than 40 characters long',
              },
            })}
            className={errors?.username?.message ? 'register-form__error-input' : 'register-form__input'}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.username && <p role="alert">{errors.username.message}</p>}
          {!errors.username && errorMessage && <p role="alert">{errorMessage}</p>}
        </label>
        <label className={'register-form__label'}>
          Email address
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Your email needs to be valid',
              },
            })}
            className={errors?.username?.message ? 'register-form__error-input' : 'register-form__input'}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
          {!errors.email && errorMessage && <p role="alert">{errorMessage}</p>}
        </label>
        <label className={'register-form__label'}>
          Password
          <input
            type="password"
            placeholder="New password"
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password cannot be more than 40 characters long',
              },
            })}
            className={errors?.username?.message ? 'register-form__error-input' : 'register-form__input'}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </label>
        <label className="register-form__label">
          Avatar image (url)
          <input
            type="text"
            placeholder="image"
            {...register('image', {})}
            className={errors?.image?.message ? 'register-form__error-input' : 'register-form__input'}
          />
          {errors.image && <p role="alert">{errors.image.message}</p>}
        </label>

        <button className="register-form__button register-form__button--margin-top" type="submit">
          Save
        </button>
        {isSave && <p className="register-form__success">Profile is edited successfully!</p>}
      </form>
    </div>
  )
}
