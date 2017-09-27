export function addToCart(item) {
	
  return {
    type: "ADD_ITEM",
    payload: item
  }
}

export function removeFromCart(item) {
	console.log(item);
  return {
    type: "REMOVE_ITEM",
    payload: item
  }
}