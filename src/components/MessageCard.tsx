'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Message } from "@/models/User.model"
import { useToast } from "./ui/use-toast"
import axios, { Axios, AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { formatDistanceToNow } from 'date-fns';
  

type MessageCardProp = {
    message : Message,
    onMessageDelete: (messageId: string) => void;
};

export function MessageCard ({message , onMessageDelete} : MessageCardProp) {

    const { toast } = useToast()
    const timeAgo = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true });

    const handleDeleteConfirm = async () => {
      
       try {
         const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
        
 
         toast({
             title: response.data.message
         });
         onMessageDelete(message._id);
       } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: 'Error',
          description: axiosError.response?.data.message ?? "failed to delete message ",
          variant: "destructive"
        });
      }
    };



  return (
    <Card className="bg-slate-800 text-white">
  <CardHeader>
    <CardTitle></CardTitle>
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><X className="w-5 h-5"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </CardHeader>
  <CardContent className="text-xl">
  {message.content}
  <CardDescription>{timeAgo}</CardDescription>
  </CardContent>
</Card>    
  )
}

