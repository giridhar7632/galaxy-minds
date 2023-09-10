import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProfileForm } from '@/components/Profile/ProfileForm'
import Loader from '@/components/common/Loader'
import { ArrowLeft, Email, Facebook, Instagram, Pencil, Twitter } from '@/components/icons'
import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import useFetcher from '@/hooks/useFetcher'
import { Tab } from '@headlessui/react'
import useToast from '@/hooks/useToast'
import data from '@/data/user.json'
import Button from '@/components/common/Button'

const IconBtn = ({ children, color, ...props }) => (
  <Link
    className={`rounded-full bg-blue-100 p-2 text-blue-500 ring-0 hover:text-blue-600 hover:ring hover:ring-blue-200 disabled:bg-blue-100 disabled:ring-0`}
    {...props}
  >
    {children}
  </Link>
)

const Profile = () => {
  const [profile, setProfile] = useState(data)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')

  const [isEdit, setIsEdit] = useState(false)

  const { user, isAuth } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const fetcher = useFetcher()
  const fetchProfile = async (id) => {
    if (isAuth) {
      try {
        const res = await fetcher(`/api/users/${id}`, { token: isAuth })
        setProfile(res)
      } catch (error) {
        console.log(error)
        error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
      }
    }

    setIsLoading(false)
  }

  const onFormSubmit = async (data) => {
    try {
      const res = await fetcher(`/api/users/me`, { token: isAuth, method: 'PUT', body: data })
      toast.open({ message: res.message, type: 'success' })
      setProfile(res.user)
      setIsEdit(false)
    } catch (error) {
      console.log(error)
      error?.message
        ? toast.open(error)
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
  }

  // useEffect(() => {
  //   if (router.isReady) {
  //     // wait until router.query is defined
  //     if (router.query.username === 'me') {
  //       setIsLoading(false)
  //       setProfile(user)
  //     } else {
  //       // fetchProfile(router.query.username)
  //       fetchProfile(router.query.username)
  //       console.log(router.query)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.query.username])

  // const tabs = {
  //   'Edit Profile': (
  //     <ProfileForm type={'Update'} onFormSubmit={onFormSubmit} defaultValues={profile} />
  //   ),
  // }

  return (
    <Layout meta={{ name: profile?.name || 'Profile' }}>
      {isLoading ? (
        <Loader />
      ) : status ? (
        <div className={'w-full text-center text-2xl font-bold text-gray-300'}>{status}</div>
      ) : (
        <div className="mx-auto flex max-w-lg flex-col">
          {!isEdit && (
            <div className="flex flex-col items-center justify-center">
              <Image
                src={profile?.profileImage || `https://api.multiavatar.com/${profile?.name}.png`}
                width={100}
                height={100}
                className={'mb-2 rounded-full'}
                alt={profile?.firstName || ''}
                loading={'lazy'}
                placeholder={'blur'}
                blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <h1 className="text-xl font-bold">{`${profile?.firstName} ${profile.lastName}`}</h1>
            </div>
          )}

          {!isEdit && (
            <div className="mx-auto my-4 flex max-w-xs items-center justify-around gap-3">
              <IconBtn href={profile?.email}>
                <Email width={24} />
              </IconBtn>
              {profile?.socials && (
                <>
                  <IconBtn href={profile?.socials.twitter} target={'_blank'}>
                    <Twitter width={24} />
                  </IconBtn>
                  <IconBtn href={profile?.socials.instagram} target={'_blank'}>
                    <Instagram width={24} />
                  </IconBtn>
                  {/* <IconBtn href={profile?.socials.facebook} target={'_blank'}>
                  <Facebook width={24} />
                </IconBtn> */}
                </>
              )}
            </div>
          )}

          {/* {router.query.username === user.username && ( */}
          {!isEdit && (
            <Button variant="secondary" onClick={() => setIsEdit(true)}>
              Edit profile
            </Button>
          )}
          {/* )} */}

          {isEdit && (
            <ProfileForm defaultValues={profile} onFormSubmit={onFormSubmit} type="Update">
              <button
                onClick={() => setIsEdit(false)}
                className="w-fit rounded-xl bg-gray-100 p-2 text-gray-500 ring-0 hover:text-gray-600 hover:ring hover:ring-gray-200 disabled:bg-gray-100 disabled:ring-0"
              >
                <ArrowLeft width={24} />
              </button>
            </ProfileForm>
          )}

          {/* <Tab.Group as={'div'} className="w-full max-w-3xl  px-2 sm:px-0">
            <Tab.List className="flex space-x-1 rounded-xl border border-gray-200 p-1">
              {Object.keys(tabs).map((tab, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    clsx(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'text-blue-500 ring-blue-200 focus:outline-none focus:ring-2',
                      selected && 'bg-blue-100 text-blue-600'
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className={'mt-2'}>
              {Object.values(tabs).map((tab, idx) => (
                <Tab.Panel
                  key={idx}
                  className={clsx('rounded-xl bg-white p-3', 'focus:outline-none')}
                >
                  {tab}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group> */}
        </div>
      )}
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
