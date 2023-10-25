// /middlewares/adminMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.isAdmin) {
    return res
      .status(403)
      .send('Acceso denegado. No tienes permisos de administrador.');
  }
  next();
};
