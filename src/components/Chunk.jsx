import PropTypes from 'prop-types'

export function Chunk({ _id, role, parts }) {
  console.log(parts)

  return (
    <article key={_id}>
      <span>
        <span className='roleLabel'>{role == 'user' ? 'You' : 'Watson'}:</span>
        <span className='chunkText'>{parts[0].text}</span>
        {parts[1]?.inline_data && (
          <span>
            <br></br>
            <i>Data File Sent.</i>
          </span>
        )}
      </span>
    </article>
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
