import clsx from 'clsx'

const Input = ({
  name,
  required,
  label,
  register,
  children,
  error,
  className,
  divClass,
  ...props
}) => {
  return (
    <div className={clsx('h-lg mb-3', divClass)}>
      {/* <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-600">
        {label}
      </label> */}
      <input
        className={clsx([
          'form-control block h-full w-full bg-gray-100 bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:border focus:ring-2',
          'm-0 rounded-xl transition ease-in-out focus:border-blue-500 focus:text-gray-700 focus:outline-none focus:ring-blue-100',
          error ? 'border-red-300 ring ring-red-300' : 'border-gray-300',
          props.disabled && 'cursor-not-allowed opacity-70',
          className,
        ])}
        name={name}
        {...props}
        {...register}
      />
      {error ? <p className="mt-2 text-xs text-red-500">{error?.message}</p> : null}
    </div>
  )
}

export default Input
