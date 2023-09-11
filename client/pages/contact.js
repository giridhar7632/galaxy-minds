import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Link from '@/components/common/Link'
import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout'

const Contact = () => {
  const [userId, setEmail] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const router = useRouter()
  const { isAuth, isLoading, login } = useAuth()
  useEffect(() => {
    if (!isLoading && isAuth) {
      router.replace('/explore')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isLoading])

  useEffect(() => {
    const subscription = watch(
      (value, { name, _type }) => name === 'userId' && setEmail(value.userId)
    )
    return () => subscription.unsubscribe()
  }, [watch])
  const onFormSubmit = handleSubmit(async (data) => {
    await login(data)
  })

  return (
    <Layout meta={{ name: 'Contact' }}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <form className="w-lg max-w-xl rounded-xl border bg-white p-12 text-base shadow-sm">
          <h1 className="mb-6 w-max text-clip text-2xl font-bold">Contact</h1>
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
            label={'Subject'}
            name={'subject'}
            type="text"
            required
            placeholder="Subject"
            aria-label="user-problem"
            register={register('subject')}
            error={errors?.subject}
          />
          <Input
            label={'Message'}
            name={'message'}
            type="textarea"
            className={'min-h-48'}
            required
            placeholder="Message"
            aria-label="user-message"
            register={register('message')}
            error={errors?.message}
          />

          <Button
            className={'mt-2 w-full'}
            loading={isLoading}
            loadingText={'Sending message...'}
            onClick={onFormSubmit}
          >
            Send Message
          </Button>
        </form>
        <div className="mt-6">
          {"Don't have an account?"} <Link href={'register'}>Register now</Link>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
