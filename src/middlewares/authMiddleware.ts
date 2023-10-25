// /middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Acceso denegado. No hay token proporcionado.');
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    // Busca al usuario en la base de datos usando el ID decodificado del token
    const user = await UserModel.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(401).send('Usuario no encontrado.');
    }

    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send('Token inválido.');
  }
};
