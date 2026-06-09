export const ItemsCounter = ({quantity}: {quantity: number}) => {

  return(
    <div>
      <button>-</button>
      <span>{quantity}</span>
      <button>+</button>
    </div>
  )
}