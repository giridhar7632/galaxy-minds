import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import ImageUpload from '../ImageUpload'

export function ProfileForm({
  onFormSubmit,
  username,
  defaultValues,
  type = 'Create',
  children,
  ...props
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (defaultValues) {
      setValue('username', defaultValues.username || username)
      setValue('firstName', defaultValues.firstName)
      setValue('lastName', defaultValues.lastName)
      setValue('email', defaultValues.email)
      if (defaultValues?.socials) {
        setValue('socials.instagram', defaultValues.socials?.instagram || '')
        setValue('socials.twitter', defaultValues.socials?.twitter || '')
      }
      setValue('profileImage', defaultValues?.profileImage || '')
    }
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    await onFormSubmit(username, data)
    reset()
    setIsLoading(false)
  })

  return (
    <div {...props} className="flex flex-col">
      <div className="w-lg max-w-xl rounded-xl border bg-white p-12 text-base shadow-sm">
        {children}
        <ImageUpload
          defaultValue={defaultValues?.profileImage}
          name={'profileImage'}
          setValue={setValue}
          alt={defaultValues?.username || username}
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
        {type == 'Update' && (
          <Input
            name="email"
            type="email"
            value={defaultValues.email}
            disabled={true}
            placeholder="Email"
          />
        )}
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
          type="button"
          className={'mt-4 w-full'}
          onClick={onSubmit}
          loading={isLoading}
          loadingText={type ? `${type.slice(0, -1)}ing your profile...` : 'Submitting...'}
        >
          {type ? `${type} my profile` : 'Submit'}
        </Button>
      </div>
    </div>
  )
}
