import React from 'react'
import Conversation from "./Coversation"
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../../../backend/utils/emojis';
 const Conversations = () => {
  const{loading,conversations}=useGetConversations();
  // console.log("Conversations",conversations);
  return (
    <div className='py-2 flex-col overflow-auto'>
      {conversations.map((conversation,idx)=>(
        <Conversation key={conversation._id} conversation={conversation}
        emoji={getRandomEmoji()}
        lastIdx={idx===conversations.length-1}>
        </Conversation>
      ))}
      {loading?<span className='loading loading-spinner mx-auto'></span>:null }
    </div>
  )
}

export default Conversations

// import React from 'react'
// import Conversation from "./Coversation"
// const Conversations = () => {
//   return (
//     <div>

// <Conversation></Conversation>
// <Conversation></Conversation>
// <Conversation></Conversation>
// <Conversation></Conversation>
// <Conversation></Conversation>
// <Conversation></Conversation>
      
//     </div>
//   )
// }

// export default Conversations
