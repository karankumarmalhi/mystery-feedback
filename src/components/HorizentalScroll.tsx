import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  company: string,
  product: string
}


export const works: Artwork[] =[
    {
        company: 'Hilalfoods',
        product: "https://hilalfoods.com.pk/wp-content/themes/hilalfoods/img/cup-cake-pack.png"
    },
    {
        company: 'Apple',
        product: 'https://www.apple.com/v/apple-vision-pro/c/images/overview/hero/portrait_base__bwsgtdddcl7m_large_2x.jpg'
    },
    {
        company: 'Alphabet Inc',
        product: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Bard_Gemini_SS.width-1300.png'
    },
    {
        company: 'OpenAI',
        product: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Bard_Gemini_SS.width-1300.png"
    }

]

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.company} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <Image
                src={artwork.product}
                alt={`Photo by ${artwork.company}`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.company}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
