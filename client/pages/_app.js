import Protected from '@/components/Protected'
import { AuthProvider } from '@/hooks/useAuth'
import { ToastProvider } from '@/hooks/useToast'
import { AnimatePresence } from 'framer-motion'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const protectedRoutes = ['/explore', '/user/[id]', '/chats']
  // const protectedRoutes = []

  return (
    <ToastProvider>
      <AuthProvider>
        <Protected protectedRoutes={protectedRoutes}>
          <AnimatePresence mode="wait" initial={false}>
            {getLayout(<Component {...pageProps} />)}
          </AnimatePresence>
        </Protected>
      </AuthProvider>
    </ToastProvider>
  )
}
