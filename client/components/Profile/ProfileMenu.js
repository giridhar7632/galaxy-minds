import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { Logout } from '../icons'

export default function ProfileMenu({
  logout,
  firstName,
  lastName,
  username,
  profileImage = 'https://api.multiavatar.com/v.png',
}) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0`}
          >
            <Image
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover object-center"
              src={profileImage}
              alt={`${firstName} ${lastName}`}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-44 transform  rounded-lg bg-white px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                  <div className="font-semibold">{`${firstName} ${lastName}`}</div>
                  <div className="truncate text-blue-500 dark:text-blue-300">{username}</div>
                </div>

                <a
                  href={'/profile/me'}
                  className="block border-y border-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  View profile
                </a>

                <a
                  href={'/chats'}
                  className="block border-y border-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Chat history
                </a>

                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <Logout width={18} />
                  <span>Sign out</span>
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
