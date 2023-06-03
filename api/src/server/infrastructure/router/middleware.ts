import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const Error404 = (_req: Request, res: Response, _next: NextFunction) => {
    const status: number = 404;
    res.status(status).json({
        status: 404,
        msj: "Recurso no encontrado"
    })
}

export const ValidarCampos = (req: Request, res: Response, next: NextFunction) => {
    const errorFormatter = (msg: any) => {
        return `${msg.msg}`;
    };

    const error = validationResult(req).formatWith(errorFormatter);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    next();
}