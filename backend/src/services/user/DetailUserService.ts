import prismaClient from "../../prisma";

class DetailUserService {
    async execute(){
        return({message: "Hello World"})
    }
}
export { DetailUserService }