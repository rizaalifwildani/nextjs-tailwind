import { PhotoIcon } from "@heroicons/react/24/outline"
import { Image } from "@nextui-org/react"
import { useState } from "react"
import Dropzone from "react-dropzone"

type Props = {
  label?: string
  errorMessage?: string
  callback?: (buffer: ArrayBuffer) => void
}

export default function CoreInputFile({ ...props }: Props) {
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
              className="dark:bg-box-input-dark bg-box-input relative rounded-xl border-2 border-dashed border-stroke px-4 py-8 dark:border-bodydark"
            >
              <input {...getInputProps()} />
              <div className="flex w-full flex-col items-center gap-3">
                {!activeImage && <PhotoIcon className="h-20 w-20" />}
                {activeImage && (
                  <Image
                    className="h-20 w-20 object-cover"
                    alt="img-upload"
                    src={activeImage}
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
        <span className="text-error text-xs">{props.errorMessage}</span>
      )}
    </div>
  )
}
