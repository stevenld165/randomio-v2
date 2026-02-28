import { API_URL } from "~/constants/api"

class BaseEndpoint {
  apiUrl: string

  constructor(basePath: string) {
    this.apiUrl = `${API_URL}${basePath}`
  }

  getBasic = async <T>(path: string) => {
    const response: T = await $fetch(`${this.apiUrl}${path}`)
    return response
  }

  getWithAuth = async <T>(path: string) => {
    const roll: T = await $fetch(`${this.apiUrl}${path}`, {
      credentials: "include",
    })

    return roll
  }

  postBasic = async <T>(path: string, body: object) => {
    const response: T = await $fetch(`${this.apiUrl}${path}`, {
      method: "POST",
      body: body,
    })

    console.log(response)
    return response
  }

  postWithAuth = async <T>(path: string, body: object) => {
    const response: T = await $fetch(`${this.apiUrl}${path}`, {
      credentials: "include",
      method: "POST",
      body: body,
    })

    console.log(response)
    return response
  }

  otherWithAuth = async <T>(
    path: string,
    method:
      | "get"
      | "post"
      | "head"
      | "patch"
      | "put"
      | "delete"
      | "connect"
      | "options"
      | "trace",
    body: object,
  ) => {
    const response = await $fetch(`${this.apiUrl}${path}`, {
      credentials: "include",
      method: method,
      body: body,
    })

    console.log(response)
    return response
  }
}

export default BaseEndpoint
