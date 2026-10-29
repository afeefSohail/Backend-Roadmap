import { z } from "zod";

export const signUpSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    name: z.string().trim().min(5, "Name is required").optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().lowercase().pipe(z.email("Invalid email address")),
    password: z.string().min(2, "Password is Required!"),
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];

/*
 - Its a concept of Type Inference in TypeScript, which allows you to extract and reuse types from existing schemas or objects.
 - TypeInference is a powerful feature of TypeScript that allows you to automatically infer the type of a variable or expression based on its value or structure, without explicitly specifying the type.
 - z.infer<typeof signUpSchema>["body"] is a TypeScript type that represents the shape of the "body" property defined in the signUpSchema object. 
 - z.infer<typeof signUpSchema>["body"]
 Breaking it into two parts:
 1. z.infer<typeof signUpSchema>
    z.object({
        body: z.object({
            email: z.string()...,
            password: z.string()...,
            name: z.string()...optional(),
        }),
    })
 - z.infer<typeof signUpSchema> generates the equivalent TypeScript type:
    {
        body: {
            email: string;
            password: string;
            name?: string;
        }
    }

2. ["body"] => TypeScript Indexed Access Types.
-  allow you to look up the type of a specific property or key directly from another Type or Interface.
-  It works exactly like accessing a value inside a JavaScript object using bracket notation (object['key']), 
-  But it happens entirely at the type level during compilation. 

{
  email: string;
  password: string;
  name?: string;
}

*/