import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Link from '@/components/common/Link'
import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout'

const Register = () => {
  const [email, setEmail] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const router = useRouter()
  const { isAuth, isLoading, register: registerUser } = useAuth()
  useEffect(() => {
    if (!isLoading && isAuth) {
      router.replace('/explore')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isLoading])

  useEffect(() => {
    const subscription = watch(
      (value, { name, _type }) => name === 'email' && setEmail(value.email)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const onFormSubmit = handleSubmit(async (data) => {
    await registerUser(data)
  })

  return (
    <Layout meta={{ name: 'Register' }}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <form className="w-lg max-w-xl rounded-xl border bg-white p-12 text-base shadow-sm">
          <h1 className="mb-6 w-max text-clip text-2xl font-bold">Register</h1>
          <Input
            label={'Username'}
            name={'username'}
            type="text"
            required
            placeholder="Username"
            aria-label="user-username"
            autoComplete="current-username"
            register={register('username', {
              required: `You should provide Username!`,
            })}
            error={errors?.username}
          />
          <Input
            label={'Email'}
            name={'email'}
            type="email"
            required
            placeholder="Email"
            aria-label="user-email"
            autoComplete="current-email"
            register={register('email', {
              required: `You should provide email!`,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email address!',
              },
            })}
            error={errors?.email}
          />
          <Input
            label={'Password'}
            type="password"
            name="password"
            placeholder={`Password`}
            aria-label="user-password"
            register={register('password', {
              required: `Password is required!`,
            })}
            error={errors?.password}
          />
          <Button
            className={'mt-2 w-full'}
            loading={isLoading}
            loadingText={'Creating account...'}
            onClick={onFormSubmit}
          >
            Create account
          </Button>
        </form>
        <div className="mt-6">
          {'Already have an account?'} <Link href={'login'}>Login now</Link>
        </div>
      </div>
    </Layout>
  )
}

export default Register
