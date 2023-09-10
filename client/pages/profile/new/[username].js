import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { ProfileForm } from '@/components/Profile/ProfileForm'

const Profile = () => {
  const { createProfile } = useAuth()
  const router = useRouter()

  return (
    <Layout meta={{ name: 'Create Profile' }}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <ProfileForm username={router.query.username} type="Create" onFormSubmit={createProfile}>
          <h1 className="mb-6 w-max text-clip text-2xl font-bold">Profile</h1>
        </ProfileForm>
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
