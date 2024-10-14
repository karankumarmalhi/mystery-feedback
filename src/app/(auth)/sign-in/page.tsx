/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/singInSchema";
import { signIn } from "next-auth/react";
import Link from "next/link";



function SignInForm() {

  const { toast } = useToast()
  const router = useRouter()

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials',{
      redirect: false,
      identifier: data.email,
      password: data.password,
     })
    // console.log(result)//todo to remove

    if(result?.error) {
      if(result.error === 'CredentialsSignin'){
      toast({
        title: "Login Failed",
        description: "Incrroect username or password",
        variant: "destructive",
      })}
    }else{
      toast({
        title: 'Error',
        description: result?.error,
        variant: 'destructive',
      })
    }
    
    if(result?.url) {
      router.replace('/dashboard')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
             Join Mystery Message
            </h1>
         <p className="mb-4">
          Sign in start your anonymous adventure
         </p>
        </div>
         <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" 
                {...field} 
                type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
         Signin
        </Button>
          </form>
         </Form>
          <div className="text-center mt-4">
            <p>
            Not a member yet?{' '}
              <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
              </Link>
            </p>
          </div>
         </div>
    </div>
  )
}

export default SignInForm
