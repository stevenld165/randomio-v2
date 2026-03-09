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
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  if (session == null) return res.status(401).send()

  next()
}
