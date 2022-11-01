


export default function Player({ name, move }){

  return (
    <div>
      <h5>{name}</h5>
      {move || "?"}
    </div>
  )
}