import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import React from 'react'

import './register-form.scss'
import { useAuth } from '../hooks/use-auth'
import { registerUser } from '../store/slice/userSlice'

export const RegisterForm = ({ title }) => {
  const dispatch = useDispatch()
  const { isAuth, errorMessage } = useAuth() // Проверяем статус авторизации
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
      agreement: 'checked',
    },
  })

  const onSubmit = (data) => {
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
    <div className="register-form__wrapper">
      <h1 className="register-form__title">Create new account</h1>
      {isAuth ? <Navigate to={'/'} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={'register-form__label'}>
          Username
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
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
              required: 'Email is required',
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
            className={errors?.username?.message ? 'register-form__error-input' : 'register-form__input'}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </label>
        <label className="register-form__label">
          Repeat Password
          <input
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Repeat password ',
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Your passwords do no match'
                }
              },
            })}
            className={errors?.username?.message ? 'register-form__error-input' : 'register-form__input'}
          />
          {errors.repeatPassword && <p role="alert">{errors.repeatPassword.message}</p>}
        </label>

        {/*<input type="checkbox">I agree to the processing of my personal information</input>*/}

        <label className="register-form__checkbox-container">
          I agree to the processing of my personal information
          <input
            type="checkbox"
            // defaultValue={'checked'}
            {...register('agreement', {
              required: 'Agreement is required ',
            })}
          />
          <span className="register-form__checkmark"></span>
        </label>
        {errors.agreement && <p role="alert">{errors.agreement.message}</p>}

        <button className="register-form__button" type="submit">
          Create
        </button>
        {isAuth && <p className="register-form__success">Register successful!</p>}
      </form>

      <p className="register-form__suggestion">
        Already have an account?{' '}
        <Link to="/login" className="register-form__sign-in">
          Sign in
        </Link>
      </p>
    </div>
  )
}
