import {createStore , applyMiddleware } from "redux";
import {combineReducers} from 'redux'
import {createLogger as logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

var foodItems = { 
	foodName: [
		{id:0, name:'Panner Tikka', addToCart: false, quantity:1, cost:25},
		{id:1, name:'Samosa', addToCart: false, quantity:1, cost:50},
		{id:2, name:'Chicken Pizza', addToCart: false, quantity:1, cost:100},
		{id:3, name:'Nachos', addToCart: false, quantity:1, cost:200},
		{id:4, name:'Burger', addToCart: false, quantity:1, cost:20},
		{id:5, name:'French Fries', addToCart: false, quantity:1, cost:40}
	],
	cartFoodName:[
		//{id:0, name:'Masala Chai', addToCart: false, quantity:0, cost:500}
	],
	totalBill:0
	
};

const reducer = (state=foodItems, action) => {


	switch(action.type){
		case "ADD_ITEM": {
			var present = false;
			

				if(state.cartFoodName.length === 0)
				{
					return Object.assign({}, state, {
						cartFoodName:[...state.cartFoodName, action.payload],
						totalBill:state.totalBill+action.payload.cost
					})
				}
				else
				{	
					
					for(var item  in state.cartFoodName){
						
						if(state.cartFoodName[item].id === action.payload.id){
							present = true ; 

							console.log('Item found ')
										return Object.assign({}, state , {
											totalBill:state.totalBill+action.payload.cost,	
											cartFoodName :  state.cartFoodName.map((cartFood) => {
											if(cartFood.id === action.payload.id){
												return Object.assign({} , cartFood , {
													quantity : cartFood.quantity + 1 
												})
											}
											else{
												return cartFood ; 
											}
											})
									
										})	


						}
					}
					if(present === false){
						console.log('New item ')
						return Object.assign({}, state , {
							cartFoodName : [...state.cartFoodName , action.payload],
							totalBill:state.totalBill+action.payload.cost

						})
					}
				}


			}




					
		case "REMOVE_ITEM": 
		{
			
			//var present = false;
				
							console.log('Delete Item found ')
							

						if(action.payload.quantity>0)
						{
							return Object.assign({}, state , {
							totalBill:state.totalBill-action.payload.cost,	
							cartFoodName :  state.cartFoodName.map((cartFood, index) => {
								if(cartFood.id === action.payload.id){
									return Object.assign({} , cartFood , {
										quantity : cartFood.quantity - 1 
										})
								}
								else{
									return cartFood ; 
								}
							})							
						})

						}
						else
						{
							return Object.assign({} , state , {
										cartFoodName: state.cartFoodName.filter(cartFoodName => cartFoodName.id !== action.payload.id)
							})
							console.log('Bill: ' + state.totalBill);
						}
						/*return Object.assign({}, state , {
							totalBill:state.totalBill-action.payload.cost,	
							cartFoodName :  state.cartFoodName.map((cartFood, index) => {
								if(cartFood.id === action.payload.id && cartFood.quantity>0){
									return Object.assign({} , cartFood , {
										quantity : cartFood.quantity - 1 
										})
								}
								else if(cartFood.quantity===0 || cartFood.quantity<0)
								{
									console.log('CART ' + cartFood.quantity);
									return Object.assign({} , cartFood,{
										cartFoodName: state.cartFoodName.filter(cartFood => cartFood.id !== action.payload.id)	
									})
														
								}
								else{
									return cartFood ; 
								}
							})							
						})*/	


					/*if(present === false){
						console.log('New item ')
						return Object.assign({}, state , {
							totalBill:state.totalBill-action.payload.cost,
							cartFoodName : [...state.cartFoodName , action.payload]

						})
					}*/
				

		}
	}

	return state;

}


const middleware = applyMiddleware(promise() , thunk , logger() ) ; 

var combine = combineReducers({reducer}) ; 

const store = createStore(combine  , middleware);

export default store;