import PropTypes from 'prop-types'
import { useQueryClient } from '@tanstack/react-query'

export function ConversationPicker({ conversationCode, setConversationCode }) {
  const queryClient = useQueryClient()

  const conversations = [
    { code: 'general_customer_service', name: 'General Customer Service' },
    { code: 'technical_assistance', name: 'Technical Assistance' },
    { code: 'financial_data', name: 'Financial Data' },
  ]

  const handleTabClick = (code) => {
    setConversationCode(code)
    queryClient.invalidateQueries(['conversations', code])
  }

  return (
    <div className='conversation-picker'>
      <div className='conversation-tabs'>
        {conversations.map(({ code, name }) => (
          <button
            key={code}
            className={`tab-btn ${conversationCode === code ? 'active' : ''}`}
            onClick={() => handleTabClick(code, name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

ConversationPicker.propTypes = {
  conversationCode: PropTypes.string.isRequired,
  setConversationCode: PropTypes.func.isRequired,
  setConversationName: PropTypes.func.isRequired,
}
