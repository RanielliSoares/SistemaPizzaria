import {Request, Response} from 'express';
import {verify} from 'jsonwebtoken';

interface Payload{
    sub:string;

}

export function isAuthenticated(
    req: Request, 
    resp: Response, 
    next: Function
){
    //receber o token
    const authToken = req.headers.authorization;

    if (!authToken) {
        return resp.status(401).end();
    }
    const[_, token] = authToken.split(" ");
    
    try{
        const {sub} = verify(
            token,
            process.env.JWT_SECRET ) as Payload;
            req.user_id = sub;
            return next();
    }catch(err){
        return resp.status(401).end();
    }

    
}