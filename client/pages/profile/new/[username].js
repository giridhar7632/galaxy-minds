import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout'
import ImageUpload from '@/components/ImageUpload'
import { useRouter } from 'next/router'

const Profile = ({ defaultValues }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const { isLoading, createProfile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (defaultValues) {
      setValue('firstName', defaultValues.firstName)
      setValue('lastName', defaultValues.lastName)
      if (defaultValues?.socials) {
        setValue('socials.instagram', defaultValues.socials?.instagram || '')
        setValue('socials.twitter', defaultValues.socials?.twitter || '')
      }
      setValue('profileImage', defaultValues?.profileImage || '')
    }
  }, [defaultValues, setValue])

  const onFormSubmit = handleSubmit(async (data) => {
    createProfile(router.query.username, data)
  })

  return (
    <Layout meta={{ name: 'Create Profile' }}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="w-lg max-w-xl rounded-xl border bg-white p-12 text-base shadow-sm">
          <h1 className="mb-6 w-max text-clip text-2xl font-bold">Profile</h1>
          <ImageUpload
            defaultValue={defaultValues?.profileImage}
            name={'profileImage'}
            setValue={setValue}
          />
          <div className="flex gap-3">
            <Input
              label={'First Name'}
              name={'firstName'}
              type="text"
              required
              placeholder="First Name"
              aria-label="user-name"
              autoComplete="current-name"
              register={register('firstName', {
                required: `Required!`,
              })}
              error={errors?.firstName}
            />
            <Input
              label={'Last Name'}
              name={'lastName'}
              type="text"
              required
              placeholder="Last Name"
              aria-label="user-name"
              autoComplete="current-name"
              register={register('lastName', {
                required: `Required!`,
              })}
              error={errors?.lastName}
            />
          </div>
          <p className="mb-2 text-xs text-gray-600">Social media (optional)</p>
          <Input
            name="instagram"
            type="link"
            placeholder="Instagram"
            register={register('socials.instagram')}
          />
          <Input
            name="twitter"
            type="link"
            placeholder="Twitter"
            register={register('socials.twitter')}
          />

          <Button
            className={'mt-2 w-full'}
            loading={isLoading}
            loadingText={'Creating profile...'}
            onClick={onFormSubmit}
          >
            Create profile
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Profile

// export async function getStaticProps({ params }) {
//   try {
//     // getting user profile
//     const res = await fetch(`http://localhost:5000/api/users/${params.id}`)
//     return {
//       // sending user data as props
//       props: { profile: res },
//       revalidate: 10,
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       props: { message: 'User not found! 😕', type: 'error' },
//     }
//   }
// }

// export async function getStaticPaths() {
//   const users = ['644b9943abb40e22051e672a', '644bb98031828d3660be9c60', '644c3113448c4be41580d7f5']
//   return {
//     paths: users,
//     fallback: true,
//   }
// }
