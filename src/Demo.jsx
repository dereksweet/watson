import { useQuery } from '@tanstack/react-query'
import { ConversationFeed } from './components/ConversationFeed.jsx'
import { SendPrompt } from './components/SendPrompt.jsx'
import { SendFile } from './components/SendFile.jsx'
import { ResetConversation } from './components/ResetConversation.jsx'
import { getConversation } from './api/conversations.js'

const code = 'test_conversation'

export function Demo() {
  const conversationQuery = useQuery({
    queryKey: ['conversations', code],
    queryFn: () => getConversation(code),
  })
  const conversation = conversationQuery.data ?? {
    conversation: { chunks: [] },
  }

  return (
    <div style={{ padding: 8 }}>
      <ResetConversation></ResetConversation>
      <hr></hr>
      <SendPrompt></SendPrompt>
      <hr></hr>
      <SendFile></SendFile>
      <hr></hr>
      <ConversationFeed
        conversation={conversation.conversation}
      ></ConversationFeed>
    </div>
  )
}
