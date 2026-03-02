const Rating = ({ value = 4 }) => {
  return (
    <div className="flex text-yellow-400 text-sm">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < value ? "★" : "☆"}</span>
      ))}
    </div>
  )
}

export default Rating
