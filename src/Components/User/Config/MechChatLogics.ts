

export const getSender = (loggedUser: any, chat: any) => {
  try {
    if (chat?.userDetails?._id === loggedUser?.mechnicId) {
      return chat?.mechanicDetails?.name;
    } else {
      return;
    }
  } catch (error) {
    console.error("Error in getSender:", error);
    return "";
  }
};

export interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
  };
  content: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
}

export const isSameSender = (messages: Message[], m: Message, i: number, userId: string): boolean => {
  return (
    i < messages.length - 1 &&
    messages[i + 1].sender._id !== m.sender._id &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages: Message[], i: number, userId: string): boolean => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    Boolean(messages[messages.length - 1].sender._id)
  );
};


export const isSameSenderMargin = (messages: Message[], m: Message, i: number, userId: string): number | "auto" => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages: Message[], m: Message, i: number): boolean => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};