import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import React from 'react'

import { useProfile } from '../hooks/use-profile'
import { loginUser, setUser } from '../store/slice/userSlice'
import './login-form.scss'
export const LoginForm = () => {
  const dispatch = useDispatch()
  const { isAuth, errorMessage } = useProfile() // Проверяем статус авторизации
  const prevEmail = useSelector((state) => state.user.email)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: prevEmail,
      password: '',
    },
  })

  const onSubmit = (data) => {
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
    <div className="register-form__wrapper">
      <h1 className="register-form__title">Sign in</h1>
      {isAuth ? <Navigate to={'/'} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={'register-form__label'}>
          Email address
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Your email needs to be valid',
              },
            })}
            className={errors?.email?.message || errorMessage ? 'register-form__error-input' : 'register-form__input'}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
          {!errors.email && errorMessage && <p role="alert">{errorMessage}</p>}
        </label>
        <label className={'register-form__label'}>
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password cannot be more than 40 characters long',
              },
            })}
            className={
              errors?.password?.message || errorMessage ? 'register-form__error-input' : 'register-form__input'
            }
          />
          {!errors.password && errors.password && <p role="alert">{errors.password.message}</p>}
        </label>

        <button className="register-form__button register-form__button--margin-top" type="submit">
          Login
        </button>
        {isAuth && <p className="register-form__success">Login successful!</p>}
      </form>

      <p className="register-form__suggestion">
        Don’t have an account?{' '}
        <Link to="/register" className="register-form__sign-in">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
