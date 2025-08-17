import NextAuth, {CredentialsSignin} from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { AccountSchema } from "./schema";
import { ZodError } from "zod";
 
declare module "next-auth"{
  interface User{
    id? : String,
    email?: String,
    name? :String,
    image?: String,
    banner?: String,
    username?: String
  }

  interface Session{
    id? : String,
    email?: String,
    name? :String,
    image?: String,
    banner?: String,
    username?: String
  }
}

class NextAuthError extends CredentialsSignin{
  constructor(message : String){
    super();
    this.code = message;
    this.message = message;
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials(
      {
        id:"credential-up",
        name:"Credential",
        credentials:{
          name: {label:"Name", type:"text"},
          email:{label:"Email", type:"text"},
          password:{label:"Password", type:"text"}
        },
        async authorize(credentials){
          try{
            const {name, email, password} = await AccountSchema.parseAsync(credentials);
          }
          catch(error: any){
            let message = error.message;
            if(error instanceof ZodError){
              const _error :ZodError = error;
              const issue = _error.issues;
              message = issue.map((e) => e.message).join(", ");
            }
            throw new NextAuthError(message);

          }
        }
      }
    )
  ],
})