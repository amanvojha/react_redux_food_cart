import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux";
import { addToCart,removeFromCart } from "./userAction";



class App extends Component {
  constructor(){
    super();
    this.state = {
      txt:'Sample'
    }
  }

  
  render() {
   
    var menuItems= this.props.menuItems.map((item,key) =>
                {
                   return(
                      <div className="panel-body" key={key}>
                        <label htmlFor="Name" className="col-sm-4 panel-body">{item.name}</label>
                        <label htmlFor="Price" className="col-sm-4 panel-body">Cost : ${item.cost}</label>
                        <button type="submit" onClick={() =>this.props.dispatch(this.props.addToCart(item))} className="col-sm-4 btn btn-success panel-default">Add</button>
                      </div>    
                   )
                }
        );

    var totalBill = this.props.totalBill;

    var cartItems= this.props.cartItems.map((item,key) =>
                {
                  
                  return(
                      <div className="panel-body" key={key}>
                        <label htmlFor="Name" className="col-sm-4 panel-body">{item.name}</label>
                        <label htmlFor="Price" className="col-sm-2 panel-body">${item.cost}</label>
                        <label htmlFor="QTY" className="col-sm-2 panel-body">QTY: {item.quantity}</label>
                        <button type="submit" onClick={() =>this.props.dispatch(this.props.removeFromCart(item))} className="col-sm-4 btn btn-danger">Delete</button>
                      </div>
                  )
                }
        );



    return (
      <div>
        <div>
          
          <div className="col-sm-6 panel panel-head panel-primary">
          { 
            <div>
              <h4>Menu</h4>
              {menuItems} 
            </div>
          }
          </div>
        </div>  
        

        <div>
          <div className="col-sm-6 panel panel-head panel-danger">
          {
            <div>
              <h4>Cart</h4>
              {cartItems}
            </div>
          }
          </div>
        </div> 

        <div>
          
          <div className="col-sm-12 panel panel-footer">
          { 
            <h4>Total Bill : ${this.props.totalBill}</h4> 
          }
          </div>
        </div>

      </div>
    );
  }
};



const mapStateToProps = (state) => { 
  return { menuItems: state.reducer.foodName,
           cartItems: state.reducer.cartFoodName,
           totalBill: state.reducer.totalBill
         };
};

const mapDispatchToProps = (dispatch) => { 
    let actions = {addToCart,removeFromCart};
    return{...actions, dispatch};
};


export default connect(mapStateToProps,mapDispatchToProps)(App);
