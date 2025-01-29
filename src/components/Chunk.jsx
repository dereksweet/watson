import PropTypes from 'prop-types'

export function Chunk({ _id, role, parts }) {
  return (
    <div
      key={_id}
      className={`message-wrapper ${
        role === 'user' ? 'user-align' : 'ai-align'
      }`}
    >
      <div className={`message ${role === 'user' ? 'user' : 'ai'}`}>
        {parts[0].text}
      </div>
    </div>
  )
}

Chunk.propTypes = {
  _id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      inline_data: PropTypes.object,
    }),
  ).isRequired,
}
