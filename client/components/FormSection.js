import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { ChevronRight } from './icons'

export default function FormSection({ title, className, children, ...props }) {
  return (
    <Disclosure className={'mb-3'} as="div" {...props}>
      {({ open }) => (
        <>
          <Disclosure.Button
            as="div"
            className={clsx(
              'flex cursor-pointer items-center justify-between rounded-xl border p-5 font-medium',
              !open && 'shadow-sm hover:shadow-md',
              className
            )}
          >
            {title}
            <ChevronRight
              width={24}
              height={24}
              className={clsx('text-blue-500', open && 'rotate-90 transform duration-100')}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            as="div"
            className="-my-1 rounded-b-xl border border-t-0 border-gray-100 p-3 shadow-sm"
          >
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
