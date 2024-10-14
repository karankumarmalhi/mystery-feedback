import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificatioEmail";
import { ApiResponse } from "@/types/ApiResponse";

// sending verification email 
// email always are async 

export async function sendVerifactoinEmail(
    email: string,
    username: string,
    verifiCode : string,

): Promise<ApiResponse> {{

    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystry messsage | Verfication ',
            react: VerificationEmail({username, otp: verifiCode}),
          });
        return {success: true, message: "Failed to send verification "}
    } catch (emailError) {
        console.log("Error sending verification email", emailError)

        return {success: true, message: "Failed to send verification "}
    }
}}
