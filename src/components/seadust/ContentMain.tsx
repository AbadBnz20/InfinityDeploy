'use client';
import React from 'react'
import { ContentRooms } from './ContentRooms';

export const ContentMain = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-2 block lg:hidden ">
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          <ContentRooms  />
        </div>
      </div>
    </main>
  )
}
