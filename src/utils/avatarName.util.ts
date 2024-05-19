const AvatarNameUtil = (fullName: string) => {
  let result = ""
  const splitName = fullName.split(" ")
  if (splitName.length > 0) {
    const firstChar = splitName[0].charAt(0)
    let secondChar = splitName[0].charAt(1)
    if (splitName.length > 1) {
      secondChar = splitName[1].charAt(0)
    }
    result = `${firstChar}${secondChar}`
  }
  return result
}

export default AvatarNameUtil
