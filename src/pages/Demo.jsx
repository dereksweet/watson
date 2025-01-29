import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ConversationFeed } from '../components/ConversationFeed.jsx'
import { SendPrompt } from '../components/SendPrompt.jsx'
import { SendFile } from '../components/SendFile.jsx'
import { ResetConversation } from '../components/ResetConversation.jsx'
import { ConversationPicker } from '../components/ConversationPicker.jsx'
import { Header } from '../components/Header.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

import { getConversation } from '../api/conversations.js'

export function Demo() {
  const [token] = useAuth()

  const [conversationCode, setConversationCode] = useState(
    'general_customer_service',
  )

  const conversationQuery = useQuery({
    queryKey: ['conversations', conversationCode],
    queryFn: () => getConversation(token, conversationCode),
  })
  const conversation = conversationQuery.data ?? {
    conversation: { chunks: [] },
  }

  return (
    <div className='chat-container'>
      <Header></Header>
      <ConversationPicker
        conversationCode={conversationCode}
        setConversationCode={setConversationCode}
      ></ConversationPicker>
      <div className='input-section'>
        <SendPrompt conversationCode={conversationCode}></SendPrompt>
        <SendFile conversationCode={conversationCode}></SendFile>
      </div>
      <ConversationFeed
        conversation={conversation.conversation}
      ></ConversationFeed>
      <ResetConversation
        conversationCode={conversationCode}
      ></ResetConversation>
    </div>
  )
}
