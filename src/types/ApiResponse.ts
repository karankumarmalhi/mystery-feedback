import { Message } from "@/models/User.model"


export interface ApiResponse {
    messages: never[]
    success: boolean,
    message : string,
    isAcceptingMessage? : boolean,
    messagesAll?: Array<Message>
}