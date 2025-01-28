import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ConversationFeed } from './components/ConversationFeed.jsx'
import { SendPrompt } from './components/SendPrompt.jsx'
import { SendFile } from './components/SendFile.jsx'
import { ResetConversation } from './components/ResetConversation.jsx'
import { ConversationPicker } from './components/ConversationPicker.jsx'

import { getConversation } from './api/conversations.js'

export function Demo() {
  const [conversationCode, setConversationCode] = useState('conversation_1')
  const [conversationName, setConversationName] = useState(
    'General Customer Service',
  )

  const conversationQuery = useQuery({
    queryKey: ['conversations', conversationCode],
    queryFn: () => getConversation(conversationCode),
  })
  const conversation = conversationQuery.data ?? {
    conversation: { chunks: [] },
  }

  return (
    <div className='chat-container'>
      <h1 className='page-title'>Watson API Demo</h1>
      <ConversationPicker
        conversationCode={conversationCode}
        setConversationCode={setConversationCode}
        setConversationName={setConversationName}
      ></ConversationPicker>
      <ResetConversation
        conversationCode={conversationCode}
      ></ResetConversation>
      <div className='input-section'>
        <SendPrompt conversationCode={conversationCode}></SendPrompt>
        <SendFile conversationCode={conversationCode}></SendFile>
      </div>
      <div className='conversation-feed-label'>{conversationName}</div>
      <ConversationFeed
        conversation={conversation.conversation}
      ></ConversationFeed>
    </div>
  )
}
