import PropTypes from 'prop-types'

export function Chunk({ _id, role, parts }) {
  return (
    <div key={_id}>
      <div className={role == 'user' ? 'message user' : 'message ai'}>
        <strong>{role == 'user' ? 'You' : 'Gemini'}:</strong> {parts[0].text}
      </div>
      {parts[1]?.inline_data && (
        <div className='message system'>
          <em>Data File Sent.</em>
        </div>
      )}
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
