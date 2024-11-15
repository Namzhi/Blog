import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

// import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'
import { useProfile } from '../hooks/use-profile'
import { editProfile, loginUser, registerUser, setUser } from '../store/slice/userSlice'

export const FormEdit = ({ title }) => {
  const dispatch = useDispatch()

  const { isAuth, errorMessage } = useAuth() // Проверяем статус авторизации
  const { username, email, password, image } = useProfile()
  // const prevEmail = useSelector((state) => state.user.email)
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="username"
          {...register('username', {
            required: 'username is required',
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
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.username && <p role="alert">{errors.username.message}</p>}
        {errorMessage && <p role="alert">{errorMessage}</p>}

        <input
          type="email"
          placeholder="email"
          {...register('email', {
            required: 'email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Your email needs to be valid',
            },
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
        {errorMessage && <p role="alert">{errorMessage}</p>}
        <input
          type="password"
          placeholder="new password"
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
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
        <input
          type="text"
          placeholder="image"
          {...register('image', {
            pattern: {
              value:
                /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
              message: 'add url to add image',
            },
          })}
        />
        {errors.image && <p role="alert">{errors.image.message}</p>}

        <button type="submit">{title}</button>
        {isAuth && <p>Register successful!</p>}
      </form>
    </div>
  )
}
