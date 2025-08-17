import z from "zod";

export const AccountSchema = z.object({
    email:z.string({
        error: (issue) => issue.input === undefined 
        ? "Email address required" 
        : "Not valid string" 
    }).email({message:"Invalid email address"}),
    name:z.string().min(1,{message:"Name must be at least 1 character"}),
    password:z.string(
        {
            error:(issue) =>issue.input === undefined
            ? "Password is required"
            : "Not valid password input"
        }
    )
    .min(8, {message:"Password  must be at least 8 characters"})
    .max(32, {message:"Password not more than 32 characters"})


})