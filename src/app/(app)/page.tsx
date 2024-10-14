'use client' 
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Autoplay from 'embla-carousel-autoplay'
import messages from '@/messages.json'



function Home() {
  return (
    <>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">Get Genuine Insights with True Feedback</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">True Feedback helps people gather honest and actionable insights, enabling them to improve their products and services based on real user experiences.</p>
      </section>
      <Carousel className="w-full max-w-xs" 
      plugins={[Autoplay({delay: 3000})]}
      >
        
      <CarouselContent>
        {
          messages.map((message, index) => (
            <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader className="text-2xl">{message.title}</CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-xl font-semibold">{message.content}</span>
                </CardContent>
                <p className="text-xs text-muted-foreground">{message.received}</p>
              </Card>
            </div>
          </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>    
    </main>


    <div className="px-96 w-full bg-gray-800 text-white">
      <h1 className="font-bold text-2xl">About True Feedback</h1>
    <Accordion type="single" collapsible className="w-full my-5">
    <AccordionItem value="item-3">
        <AccordionTrigger>Our Mission</AccordionTrigger>
        <AccordionContent>
          <p>
          At True Feedback, our mission is to empower individuals and organizations by providing a platform that fosters open, honest communication and continuous improvement. We believe that true progress is driven by understanding and addressing both strengths and areas for growth, and we are dedicated to facilitating this process through innovative AI technology.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1" >
        <AccordionTrigger>What We Offer</AccordionTrigger>
        <AccordionContent>
          <p>
          1. AI-Driven Analysis: Our sophisticated AI algorithms analyze feedback to identify key themes, sentiments, and actionable points, helping you understand the core message quickly and effectively.
          </p>

          <p>
          2. Real-Time Feedback: Receive instant feedback on your projects, presentations, or performance, allowing you to make timely adjustments and improvements.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why Choose True Feedback?</AccordionTrigger>
        <AccordionContent>
          <p>
            <h5 className="font-bold">Accuracy and Honesty:</h5>
            Our AI is designed to deliver precise and straightforward feedback, free from biases and sugar-coating.
          </p>
          <p>
            <h5 className="font-bold">Comprehensive Insights:</h5>
            Beyond just positive or negative feedback, our app provides detailed analysis, highlighting specific areas of strength and opportunities for improvement.
          </p>
          <p>
            <h5 className="font-bold">Community and Collaboration:</h5>
            Join a community of like-minded individuals and professionals who are committed to growth and excellence. Share your experiences and learn from others.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
    <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
    © 2024 True Feedback. All rights reserved.
  </footer>
  </>
  )
}

export default Home