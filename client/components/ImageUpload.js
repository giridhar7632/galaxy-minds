import React, { useState } from 'react'
import Button from './common/Button'
import Image from 'next/image'
import clsx from 'clsx'
import { Pencil } from './icons'

const ImageUpload = ({ defaultValue, setValue, alt, name = 'image' }) => {
  const [imageSrc, setImageSrc] = useState(defaultValue)
  const [loading, setLoading] = useState(false)
  const [uploadData, setUploadData] = useState()
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader()
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
      setUploadData(undefined)
    }
    reader.readAsDataURL(changeEvent.target.files[0])
  }

  const handleUpload = async (uploadEvent) => {
    uploadEvent.preventDefault()
    setLoading(true)
    const form = uploadEvent.currentTarget
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')
    try {
      const formData = new FormData()
      // adding upload preset
      formData.append('upload_preset', 'kfukpj6f')

      for (const file of fileInput.files) {
        formData.append('file', file)
      }
      const res = await fetch('https://api.cloudinary.com/v1_1/scrapbook/image/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setImageSrc(data.secure_url)
      setValue(name, data.secure_url)
      setUploadData(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleUpload} className="mx-auto mb-4 max-w-fit">
      <input
        name="file"
        type="file"
        onChange={handleOnChange}
        id="files"
        className="mb-3 hidden rounded-xl border bg-gray-100 p-4 focus:border-blue-300 focus:ring-blue-300"
      />
      <label htmlFor="files" className="relative mb-2 block cursor-pointer">
        <Image
          width={name === 'profileImage' ? 426 : 100}
          height={name === 'profileImage' ? 426 : 100}
          className={clsx(
            'h-36 w-36 rounded-full object-cover object-center',
            name === 'profileImage' ? 'aspect-square' : 'aspect-video'
          )}
          src={imageSrc ? imageSrc : `https://api.multiavatar.com/${alt}.png`}
          alt={alt}
        />

        <div class="absolute bottom-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 p-1 text-xs font-bold text-white dark:border-gray-900">
          <Pencil />
        </div>
      </label>
      {/* <div>
        {imageSrc && (
          <Image
            width={name === 'profileImage' ? 426 : 100}
            height={name === 'profileImage' ? 426 : 100}
            className={clsx(
              'mx-auto mb-2 h-36 w-36 rounded-full object-cover object-center',
              name === 'profileImage' ? 'aspect-square' : 'aspect-video'
            )}
            src={imageSrc}
            alt=""
          />
        )} */}
      {imageSrc && !uploadData && (
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          loading={loading}
          loadingText="Uploading..."
        >
          Upload
        </Button>
      )}
      {/* </div> */}
    </form>
  )
}

export default ImageUpload
