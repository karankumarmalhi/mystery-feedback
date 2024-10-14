/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, {AxiosError} from 'axios'
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";



function SignupForm() {

  //De bouncing techniques
  const [username , setUsername ] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckUsernam, setIsCheckUsername] = useState(false)
  const [isSubmiting , setIsSubmiting] = useState(false)

  const debounced = useDebounceCallback(setUsername, 300)
  const { toast } = useToast()
  const router = useRouter()

  //zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if(username) {
        setIsCheckUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`)

          console.log(response)// Todo to remove
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>; 
          setUsernameMessage(
            axiosError.response?.data.message ?? "error checking username"
          )
        }finally {
          setIsCheckUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmiting(true)
    try {
      const response = axios.post<ApiResponse>('/api/sign-up', data)
      console.log(response)
      toast({
        title:'Success',
        description: (await response).data.message
      })

      router.replace(`verify/${username}`)
      setIsSubmiting(false)

    } catch (error) {
      console.error('error in sign-up of user', error)
      const axiosError = error as AxiosError<ApiResponse>; 
        let errorMessage = axiosError.response?.data.message

        toast({
          title: "Signup failed",
          description: errorMessage,
          variant:'destructive'
        })
        setIsSubmiting(false)
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
          Sign up to start your anonymous adventure
         </p>
        </div>
        
    
         <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" 
                {...field} 
                onChange={(e) => {
                  field.onChange(e)
                  debounced(e.target.value)
                }}
                />
              </FormControl>
              {isCheckUsernam && <Loader2 className="animate-spin"/>}
              <p className={`text-sm ${usernameMessage === 'Username is unique'? (`text-green-600`):(`text-red-600`)}`}>
                {usernameMessage}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" 
                {...field} 
                type="email"
                />
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
        <Button type="submit" disabled={isSubmiting}>
          {
            isSubmiting ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin">
                Please wait
              </Loader2>
              </>
            ) : ('Signup')
          }
        </Button>
          </form>
         </Form>
         <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className= "text-blue-600 hover:text-blue-800" />Signin
          </p>
         </div>
         </div>
    </div>
  )
}

export default SignupForm
