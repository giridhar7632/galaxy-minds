import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

const explore = () => {
  const { user } = useAuth()
  console.log({ user })
  return <Layout meta={{ name: 'Explore' }}>explore</Layout>
}

export default explore
