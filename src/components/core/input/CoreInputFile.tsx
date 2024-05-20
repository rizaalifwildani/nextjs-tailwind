import { PhotoIcon } from "@heroicons/react/24/outline"
import { Image } from "@nextui-org/react"
import { useState } from "react"
import Dropzone from "react-dropzone"

type Props = {
  label?: string
  errorMessage?: string
  initialValue?: string
  disabled?: boolean
  callback?: (buffer: ArrayBuffer) => void
}

export default function CoreInputFile({ disabled = false, ...props }: Props) {
  const [activeImage, setActiveImage] = useState<string | undefined>()
  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      if (reader.result) {
        setActiveImage(`${reader.result}`)
        if (props.callback) {
          const res = await file.arrayBuffer()
          props.callback(res)
        }
      }
    }
    reader.onerror = function (error) {
      setActiveImage(undefined)
      console.log("Error: ", error)
    }
  }

  return (
    <div className="core-input-file">
      {props.label && (
        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
          {props.label}
        </label>
      )}
      <Dropzone
        disabled={disabled}
        onDrop={(file) => {
          if (file.length > 0) {
            handleFile(file[0])
          }
        }}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className="relative rounded-xl border-2 border-dashed border-stroke bg-box-input px-4 py-8 dark:border-bodydark dark:bg-box-input-dark"
            >
              <input {...getInputProps()} />
              <div className="flex w-full flex-col items-center gap-3">
                {!activeImage && !props.initialValue && (
                  <PhotoIcon className="h-20 w-20" />
                )}
                {(activeImage || props.initialValue) && (
                  <Image
                    className="h-20 w-20 object-cover"
                    alt="img-upload"
                    src={activeImage ?? props.initialValue}
                  />
                )}
                <span className="text-sm">
                  Drag & drop some file here, or click to select file
                </span>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {props.errorMessage != null && props.errorMessage.length > 0 && (
        <span className="text-xs text-error">{props.errorMessage}</span>
      )}
    </div>
  )
}
