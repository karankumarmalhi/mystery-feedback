/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { messageSchema } from '@/schemas/messageSchema'
import* as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useCompletion } from '@ai-sdk/react';
import { Textarea } from '@/components/ui/textarea'
import { BrainCircuit } from 'lucide-react';
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react';


function page() {
  const params = useParams()
  const { toast } = useToast()
  const {username} = params

 const onClickin = () => {
  const {completion, handleSubmit} = useCompletion({
    api:'api/genai'
  })
 }
  // const [input , setInput] = useState('')

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema)
  })

  const onSubmit = async(data : z.infer <typeof messageSchema>) => {

    const message = 
     [ {
        "question_id": 1,
        "question_text": "What is the average rating of the talk?"
      },
      {
        "question_id": 2,
        "question_text": "How many attendees rated the talk 5?"
      },
      {
        "question_id": 3,
        "question_text": "What are some common comments about the talk?",
      },
    ]
    try {
      const response = await axios.post('/api/send-message',{username, content: data.content});

      toast({
        title: "Message Sended",
        description: response?.data?.message,
        variant: 'default'
      })

    } catch (error) {
      toast({
        title: 'Error',
        description: "Not Accepting Messages",
        variant: 'destructive'
      })
    }
  }


  return (
    <>
  <div {...form}>
      <div className='flex items-center justify-center'>
        <h1 className='text-4xl font-bold mt-24'>Public Profile Link</h1>
      </div>
      <div className='px-24'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Send Your True Feedback to: <i className='font-bold'>{username}</i></FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='type your message'></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <Button type="submit">Send Message</Button>
      </form>
    </Form>
      </div>
  </div>
  <div className='px-24 py-10 w-full h-full border-white'>
   <div className='flex items-center justify-center mb-4 '>
   <h1 className='font-bold text-3xl flex bg-slate-300 px-2 py-3 rounded-2xl'> <BrainCircuit size={36}/> Write With AI</h1>
   </div>
    <form action="" className='border rounded-md p-4'>
      <label htmlFor="" className='flex m-2 font-bold'>Just write which type feedback you want send:</label>
     <Input placeholder='just type...'/><Send color='ffff' />
    </form>
     
  </div>
    </>
  )
}

export default page