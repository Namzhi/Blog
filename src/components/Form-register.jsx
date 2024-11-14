import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useAuth } from '../hooks/use-auth'
import { loginUser, registerUser, setUser } from '../store/slice/userSlice'

export const FormRegister = ({ title }) => {
  const dispatch = useDispatch()
  const { isAuth, errorMessage } = useAuth() // Проверяем статус авторизации
  // const prevEmail = useSelector((state) => state.user.email)
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (data) => {
    // console.log(prevEmail)
    dispatch(
      registerUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
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
          placeholder="password"
          {...register('password', {
            required: 'password is required',
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
          type="password"
          placeholder="password"
          {...register('repeatPassword', {
            required: 'repeat password ',
            validate: (val) => {
              if (watch('password') !== val) {
                return 'Your passwords do no match'
              }
            },
          })}
        />
        {errors.repeatPassword && <p role="alert">{errors.repeatPassword.message}</p>}
        <button type="submit">{title}</button>
        {isAuth && <p>Register successful!</p>}
      </form>
    </div>
  )
}
