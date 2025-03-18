import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';

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
        
        

        return({ok: true})
    }
}
export {AuthUserService};