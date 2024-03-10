import { getSession } from "../libs/session"

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ApiConfig {
  static HEADERS = {
    "Content-Type": "application/json",
    "x-api-Key": process.env.API_KEY ?? "",
  }

  static async GuestPost(path: string, body?: any) {
    try {
      console.info(`<==== Request to : ${path} . . . ====>`)
      const res = await fetch(`${process.env.API_HOSTNAME}${path}`, {
        method: "POST",
        headers: ApiConfig.HEADERS,
        body: JSON.stringify(body ?? {}),
      })
      console.info(`<==== Request to : ${path} ${res.status} ====>`)

      const data = await res.json().catch((err) => {
        console.info(`<==== Request to : ${path} failed ====>`)
        console.error(`problem : ${err}`)
        return null
      })
      return data
    } catch (error) {
      console.info(`<==== Request to : ${path} failed ====>`)
      console.error(`problem : ${error}`)
      return null
    }
  }

  static async GuestGet(path: string) {
    try {
      console.info(`<==== Request to : ${path} . . . ====>`)
      const res = await fetch(`${process.env.API_HOSTNAME}${path}`, {
        method: "GET",
        headers: ApiConfig.HEADERS,
      })
      console.info(`<==== Request to : ${path} ${res.status} ====>`)

      const data = await res.json().catch((err) => {
        console.info(`<==== Request to : ${path} failed ====>`)
        console.error(`problem : ${err}`)
        return null
      })
      return data
    } catch (error) {
      console.info(`<==== Request to : ${path} failed ====>`)
      console.error(`problem : ${error}`)
      return null
    }
  }

  static async Post(path: string, req: Request, body: any) {
    try {
      const session = await getSession()

      console.info(`<==== Request to : ${path} . . . ====>`)
      const res = await fetch(`${process.env.API_HOSTNAME}${path}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.token}`,
          ...ApiConfig.HEADERS,
        },
        body: JSON.stringify(body),
      })
      console.info(`<==== Request to : ${path} ${res.status} ====>`)

      const data = await res.json().catch((err) => {
        console.info(`<==== Request to : ${path} failed ====>`)
        console.error(`problem : ${err}`)
        return null
      })
      return data
    } catch (error) {
      console.info(`<==== Request to : ${path} failed ====>`)
      console.error(`problem : ${error}`)
      return null
    }
  }

  static async Put(path: string, req: Request, body: any) {
    try {
      const session = await getSession()

      console.info(`<==== Request to : ${path} . . . ====>`)
      const res = await fetch(`${process.env.API_HOSTNAME}${path}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.token}`,
          ...ApiConfig.HEADERS,
        },
        body: JSON.stringify(body),
      })
      console.info(`<==== Request to : ${path} ${res.status} ====>`)

      const data = await res.json().catch((err) => {
        console.info(`<==== Request to : ${path} failed ====>`)
        console.error(`problem : ${err}`)
        return null
      })
      return data
    } catch (error) {
      console.info(`<==== Request to : ${path} failed ====>`)
      console.error(`problem : ${error}`)
      return null
    }
  }

  static async Get(path: string) {
    try {
      const session = await getSession()

      console.info(`<==== Request to : ${path} . . . ====>`)
      const res = await fetch(`${process.env.API_HOSTNAME}${path}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.token}`,
          ...ApiConfig.HEADERS,
        },
      })
      console.info(`<==== Request to : ${path} ${res.status} ====>`)

      const data = await res.json().catch((err) => {
        console.info(`<==== Request to : ${path} failed ====>`)
        console.error(`problem : ${err}`)
        return null
      })
      return data
    } catch (error) {
      console.info(`<==== Request to : ${path} failed ====>`)
      console.error(`problem : ${error}`)
      return null
    }
  }
}
