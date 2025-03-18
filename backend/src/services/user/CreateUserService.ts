import prismaClient from "../../prisma"; '../../prisma';

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        // Verificar se foi enviado um email
        if(!email){
            throw new Error("Email incorreto!");
        }
        //verificar se o email já existe
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });
        if(userAlreadyExists){
            throw new Error("Email já cadastrado!");
        }

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: password
            }
        });

        console.log(name)
        return{user};
    }
}
export {CreateUserService};