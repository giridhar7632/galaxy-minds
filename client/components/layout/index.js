import Footer from './Footer'
import Meta from './Meta'
import Navbar from './Navbar'
import { motion } from 'framer-motion'

const Layout = ({ meta, children, ...props }) => {
  return (
    <div className="max-w-screen min-h-screen">
      <Meta {...meta} />
      <div className="mx-auto flex min-h-screen w-[100%] max-w-screen-xl flex-col px-2 lg:px-6 xl:px-4">
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="flex-1 px-4 py-2 md:px-6 lg:px-4 xl:px-0"
          {...props}
        >
          {children}
        </motion.div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
