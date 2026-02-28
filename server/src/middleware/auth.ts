import { Request, Response, NextFunction } from "express"
import { AuthRequest, TokenInfo } from "../types/internal-types"

import jwt, { JwtPayload, Secret } from "jsonwebtoken"

import { auth } from "../auth"
import { fromNodeHeaders } from "better-auth/node"

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // // Bearer Token
  // const authHeader = req.headers["authorization"]
  // const token = authHeader && authHeader.split(" ")[1]

  // console.log(authHeader)
  // console.log(token)

  // if (token == null) return res.sendStatus(401)

  // try {
  //   const decoded = jwt.verify(
  //     token,
  //     process.env.ACCESS_TOKEN_SECRET!,
  //   ) as TokenInfo
  //   req.user = decoded
  //   next()
  // } catch (error) {
  //   return res.sendStatus(401)
  // }

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  if (session == null) return res.status(401).send()

  next()
}
