import React, { useState } from 'react';
import { Card, Input, Avatar, Skeleton, Textarea } from "@nextui-org/react";

const SkeletonChatPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-96 bg-gray-200 p-4 flex flex-col">
        <Textarea className="mb-4 font-bold">Contacts</Textarea>
        {isLoading ? (
          // Loading state for sidebar
          <>
            <div className="flex items-center mb-4">
              <Skeleton className="rounded-full w-10 h-10 mr-3" />
              <div>
                <Skeleton className="h-4 w-32 rounded mb-2" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <Skeleton className="rounded-full w-10 h-10 mr-3" />
              <div>
                <Skeleton className="h-4 w-32 rounded mb-2" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            </div>
          </>
        ) : (
          // Loaded state for sidebar
          <>
            <div className="flex items-center mb-4">
              <Avatar src="" size="sm" className="mr-3" />
              <div>
                <Textarea className="font-semibold">John Doe</Textarea>
                <Textarea className="text-sm text-gray-500">Online</Textarea>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <Avatar src="" size="sm" className="mr-3" />
              <div>
                <Textarea className="font-semibold">Jane Smith</Textarea>
                <Textarea className="text-sm text-gray-500">Offline</Textarea>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 bg-gray-100">
          <Textarea className="font-bold text-xl">Chat App</Textarea>
        </header>

        {/* Chat Messages */}
        <Card className="flex-grow overflow-y-auto p-4">
          {isLoading ? (
            // Loading state
            <>
              <div className="flex items-start mb-4">
                <Skeleton className="rounded-full w-8 h-8" />
                <div className="ml-3 flex-grow">
                  <Skeleton className="h-4 w-3/4 rounded mb-2" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
              <div className="flex items-start mb-4 justify-end">
                <div className="mr-3 flex-grow text-right">
                  <Skeleton className="h-4 w-3/4 rounded mb-2 ml-auto" />
                  <Skeleton className="h-3 w-1/2 rounded ml-auto" />
                </div>
                <Skeleton className="rounded-full w-8 h-8" />
              </div>
            </>
          ) : (
            // Loaded state
            <>
              <div className="flex items-start mb-4">
                <Avatar src="" size="sm" />
                <div className="ml-3 bg-gray-100 rounded-lg p-3">
                  <Textarea>Hello! How can I help you today?</Textarea>
                </div>
              </div>
              <div className="flex items-start mb-4 justify-end">
                <div className="mr-3 bg-blue-100 rounded-lg p-3">
                  <Textarea>Hi! I have a question about my account.</Textarea>
                </div>
                <Avatar src="" size="sm" />
              </div>
            </>
          )}
        </Card>

        {/* Input Area */}
        <div className="p-4 bg-gray-100">
          <div className="flex">
            <Input 
              className="flex-grow"
              placeholder="Type your message..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonChatPage;