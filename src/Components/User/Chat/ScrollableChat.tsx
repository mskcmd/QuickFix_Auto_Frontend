import { Avatar, Tooltip } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/ChatLogics";

export interface ScrollableChatProps {
  messages: any[];
  user: {
    _id: string;
  };
  fetchMoreMessages: () => void;
  hasMore: boolean;
}

function ScrollableChat({
  messages,
  user,
  fetchMoreMessages,
  hasMore,
}: ScrollableChatProps) {
  return (
    <>
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMoreMessages}
        hasMore={hasMore}
        inverse={true} // This loads the messages in reverse (for chat scroll up)
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {messages.map((m, i) => (
          <div key={m._id} style={{ display: "flex" }}>
            {m?.sender &&
              (isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default ScrollableChat;
