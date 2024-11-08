import NextAuth,{DefaultSession} from "next-auth";

declare module 'next-auth' {
    interface Session{
        user:{
            firstname:string,
            lastname: string,
            email: string,
            birthdate:string,
            image:string,
            country:string,
            phone:string,
            token: string,
        } & DefaultSession['user'];
    }
}




