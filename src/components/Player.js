


export default function Player({ name, move, suffix = "" }){

  return (
    <div>
      <h5>{name}</h5>
      {
        move ?
          (<img src={`/${move + suffix}.png`}></img>)
          : <span>?</span>
      }
    </div>
  )
}