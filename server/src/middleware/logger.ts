import { Request, Response, NextFunction } from "express"

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.url} - ${req.method}: ${req.body}`)
  next()
}

module.exports = logger
