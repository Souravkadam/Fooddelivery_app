import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import {assets} from "../../assets/assets";
import {StoreContext} from "../../context/StoreContext";
import { calculateCartTotal } from "../../util/CartUtil";
import axios from "axios";
import { RAZORPAY_KEY } from "../../util/contants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import Razorpay from "razorpay";


const PlaceOrder = () => {
  const {foodList, quantities, setQuantities, token} = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
     firstName: '',
     lastName: '',
     email:'',
     phoneNumber: '',
     address: '',
     state: '',
     city: '',
     zip: '',
  });

  const onChangeHandler = (event) => {
  const { name, value } = event.target;
  setData(prev => ({ ...prev, [name]: value }));
};

const onSubmitHandler = async(event) => {
  event.preventDefault();
  const orderData = {
    userAddress: `${data.firstName}, ${data.lastName}, ${data.address},${data.city}, ${data.state}, ${data.zip}`,
    phoneNumber: data.phoneNumber,
    email: data.email,
    orderedItems: cartItems.map(item =>({
      foodId: item.id,
       quantities: quantities[item.id] ?? 1,
      price: item.price * quantities[item.id],
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description,
      name: item.name
    })),
    amount: Number(total.toFixed(2)), // ✅ FIXED
  orderStatus: "preparing"
  };
  
  try{
    const response = await axios.post('http://localhost:8080/api/orders/create',orderData, {headers:{'Authorization':`Bearer ${token}`}});
    if(response.status === 201 && response.data.razorpayOrderId){
      // initiate the payment
      initiateRazorPayment(response.data);
    }else{
      toast.error("unable to place order. Please try again")
    }
  }catch(error){
   toast.error("unable to place order. please try again",error);
  }
};

const initiateRazorPayment = (order) =>{
  const options = {
       key: RAZORPAY_KEY,
       amount: order.amount,// convert to paise
       currency: "INR",
      name: "food land",
      description: "Food order payment",
      order_id: order.razorpayOrderId,
      handler: async function(razorpayResponse){
        await verifyPayment(razorpayResponse);
      },
      prefill: {
        name:`${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber
      },
      theme: {color: '#3399cc'},
      model: {
        ondismiss: async function () {
          toast.error("Payment cancelled.");
         await deleteOrder (order.id);
        }
      },
  };
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

const verifyPayment = async (razorpayResponse) =>{
  const paymentData = {
    razorpay_payment_id: razorpayResponse.razorpay_payment_id,
    razorpay_order_id: razorpayResponse.razorpay_order_id,
    razorpay_signature: razorpayResponse.razorpay_signature
  };

 try{
   const response = await axios.post('http://localhost:8080/api/orders/verify', paymentData, {headers: {'Authorization': `Bearer ${token}`}});

  if(response.status === 200){
  toast.success('Payment Successful');
  await clearCart();
  navigate("/myorders");
 }else{
  toast.error("Payment is Failed. Please try again");
  navigate('/');
 }
 }catch(error){
  toast.error("Payment is failed. Please try again",error);
 }
}

const deleteOrder = async(orderId) =>{
  try{
    await axios.delete('http://localhost:8080/api/orders'+orderId, {headers: {Anthorization: `Bearer ${token}`}})
  }catch(error){
    toast.error('Something is wrong Contact support',error);
  }
}

const clearCart = async () =>{
  try {
        await axios.delete('http://localhost:8080/api/cart', {headers: {'Anthorization': `Bearer ${token}`}});
        setQuantities({});
  } catch (error) {
    toast.error("Error while clearing the cart.",error)
  }
}

  
  const cartItems = foodList.filter(food => quantities[food.id] > 0);
       const {subtotal, shipping, tax, total} = calculateCartTotal(cartItems, quantities);
  
    return (
    <div className="container px-5 bt-4">
      <main>
        <div className="py-2 text-center">
        <img className="d-block mx-auto" src={assets.bill} alt="" width="82" height="82"/>
        <h2>Checkout form</h2>
      </div>
        <div className="row g-5 justify-content-center">

          <div className="col-md-6 col-lg-5 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>

            <ul className="list-group mb-3">
              {cartItems.map(item => (
                 <li
                    key={item.id}
                         className="list-group-item d-flex justify-content-between">
                       <div>
                         <h6 className="my-0">{item.name}</h6>
                            <small className="text-muted">
                                Qty: {quantities[item.id]}
                          </small>
                         </div>
                      <span className="text-body-secondary">
                            &#8377;{item.price * quantities[item.id]}
                     </span>
                  </li>
                   ))}
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Shipping</span>
                </div>
                <span className="text-body-secondary">&#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
              </li>

              <li className="list-group-item d-flex justify-content-between ">
                <div>
                  <span>Tax (10%)</span>
                </div>
                <span className="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>&#8377;{total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>

          {/* LEFT FORM */}
          <div className="col-md-5 col-lg-5">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" onSubmit={onSubmitHandler}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input type="text" className="form-control" id="firstName" placeholder="Jho" required 
                  name="firstName" 
                  onChange={onChangeHandler}
                  value={data.firstName}/>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input type="text" className="form-control" id="lastName" placeholder="Deo" required 
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}/>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                   Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">@</span>
                    <input type="email" className="form-control" placeholder="email" id="email" required 
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}/>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="2312356576"
                    required
                    value={data.phoneNumber}
                    name="phoneNumber"
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                    value={data.address}
                    name="address"
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="country" required 
                  name="state" 
                  value={data.state}
                  onChange={onChangeHandler}> 
                    <option value="">Choose...</option>
                    <option>Maharashtra</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">
                    city
                  </label>
                  <select className="form-select" id="state" required 
                  name="city" 
                  value={data.city} onChange={onChangeHandler}>
                    <option value="">Choose...</option>
                    <option>Tasgaon</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input type="number" className="form-control" id="zip" required 
                  name="zip" value={data.zip} 
                  onChange={onChangeHandler}/>
                </div>
              </div>

              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>
                Continue to checkout
              </button>
              <br /><br /><br/>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;
