import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest{
    email: string;
    password: string;
}
class AuthUserService{
    async execute({email, password}: AuthRequest){

        // Verificar se foi enviado um email
        if(!email){
            throw new Error("Email incorreto!");
        }
        //verificar se o email já existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });
        //caso o e-mail não exista na base de dados
        if(!user){
            throw new Error("Email ou Senha não encontrado!");
        }

        //verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new Error("Email ou Senha não encontrado!");
        }
        
        //após confirmar email e senha no banco vamos gerar o token para o usuario
        const token = sign({
            name: user.name,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "30d"
        }
    )

        return{
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}
export {AuthUserService};