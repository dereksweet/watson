import PropTypes from 'prop-types'
import { useQueryClient } from '@tanstack/react-query'

export function ConversationPicker({
  conversationCode,
  setConversationCode,
  setConversationName,
}) {
  const queryClient = useQueryClient()
  const handleSubmit = (e) => {
    e.preventDefault()
    queryClient.invalidateQueries(['conversations', conversationCode])
  }

  return (
    <div className='conversation-picker'>
      <form
        id='conversation-code-form'
        className='conversation-picker__form'
        onSubmit={handleSubmit}
      >
        <label
          htmlFor='conversation-select'
          className='conversation-picker__label'
        >
          Select a Conversation:
        </label>

        <select
          id='conversation-code'
          name='conversation-code'
          value={conversationCode}
          onChange={(e) => {
            setConversationCode(e.target.value)
            setConversationName(e.target.options[e.target.selectedIndex].text)
          }}
          className='conversation-picker__select'
        >
          <option value='general_customer_service'>
            General Customer Service
          </option>
          <option value='technical_assistance'>Technical Assistance</option>
          <option value='financial_data'>Financial Data</option>
        </select>
      </form>
    </div>
  )
}

ConversationPicker.propTypes = {
  conversationCode: PropTypes.string.isRequired, // Must be a string and required
  setConversationCode: PropTypes.func.isRequired, // Must be a function and required
  setConversationName: PropTypes.func.isRequired, // Must be a function and required
}
