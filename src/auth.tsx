import NextAuth, {CredentialsSignin} from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { AccountSchema } from "./schema";
import { ZodError } from "zod";
import UserModel from "./models/UserModel";
import bcrypt from "bcryptjs";
import { getFileUrl } from "./utils";
 
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

const composeUser = (user: any) => {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    username: user.username,
    image: user?.image ? getFileUrl(user._id.toString(), user.image) : null,
    banner: user?.banner ? getFileUrl(user._id.toString(), user.banner) : null
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  session:{strategy: "jwt"},
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
            const user = await UserModel.findOne({ email: email.toLowerCase() });
            if(user){
              throw new NextAuthError("User already exists with this email");
            }
            const hash = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({email: email.toLowerCase(), name, password: hash,
              username: email.split("@")[0].toLowerCase(), banner: "", image: ""
            });
            if(!newUser){
              throw new NextAuthError("Failed to create user");
            }
            return composeUser(newUser);

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
      },
      
    ),
    Credentials(
      {
        id:"credential-in",
        name:"Credential",
        credentials:{
          email:{label:"Email", type:"text"},
          password:{label:"Password", type:"text"}
        },
        async authorize(credentials){
          try{
            const SignInCredentialsSchema = AccountSchema.pick({email:true, password:true});
            const {email, password} = await SignInCredentialsSchema.parseAsync(credentials);
            
            const user = await UserModel.findOne({ email: email.toLowerCase() });
            if(!user){
              throw new NextAuthError("User email/password invalid");
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
              throw new NextAuthError("User email/password invalid");
            }
            return composeUser(user);
            

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
      },
      
    )
  ],
  callbacks: {
    signIn: async ({user}) => {
      if(user){
        return true;
      }
      throw new NextAuthError("Sign in failed");
    },
    session: async ({session, token}) => {
      if(token){
        session.user = token.user as any;
      }
      return session;
    },
    jwt: async ({token, user}) => {
      if(token && user){
        token.user = user;
      }
      return token;
    }
})