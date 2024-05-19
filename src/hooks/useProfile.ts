import { UserResponse } from "@/models/response/user.response"
import UserService from "@/services/user.service"
import { useEffect, useState } from "react"

const useProfile = () => {
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [profile, setProfile] = useState<UserResponse | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProfile(true)
      const res = await UserService.profile()
      if (res) {
        setProfile(res)
      }
      setLoadingProfile(false)
    }
    fetchData()
  }, [])

  return { profile, loadingProfile }
}

export default useProfile
