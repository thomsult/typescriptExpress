import { NotFoundException } from '../utils/exceptions'
import { NextFunction, Request, Response } from 'express'
/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
export const UnknownRoutesHandler = () => {
  throw new NotFoundException("Route not found")
}