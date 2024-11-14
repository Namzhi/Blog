import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useAuth } from '../hooks/use-auth'
import { loginUser, setUser } from '../store/slice/userSlice'

export const FormLogin = ({ title }) => {
  const dispatch = useDispatch()
  const { isAuth } = useAuth() // Проверяем статус авторизации
  const prevEmail = useSelector((state) => state.user.email)
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      email: prevEmail,
      password: '',
    },
  })

  const onSubmit = (data) => {
    // console.log(prevEmail)
    dispatch(
      loginUser({
        user: {
          email: data.email,
          password: data.password,
        },
      })
    )
    dispatch(setUser(data.email))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit">{title}</button>
        {isAuth && <p>Login successful!</p>}
      </form>
    </div>
  )
}
