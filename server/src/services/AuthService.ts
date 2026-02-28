import { Request, Response } from "express"
import { auth } from "../auth"
import { fromNodeHeaders } from "better-auth/node"

class AuthService {
  getSession = async (req: Request) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    return session
  }

  getUser = async (req: Request) => {
    const session = await this.getSession(req)

    if (session == null) return

    return session.user
  }
}

export default new AuthService()
