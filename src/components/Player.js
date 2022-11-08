


export default function Player({ name, move, reversed }){

  return (
    <div>
      <h5>{name}</h5>
      {
        move ?
          (<img src={`/${move + (reversed ? "-r":"")}.png`}></img>)
          : <span>?</span>
      }
    </div>
  )
}