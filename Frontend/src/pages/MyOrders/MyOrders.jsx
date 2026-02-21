import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets';
import "./MyOrders.css"

const MyOrders = () => {
  const { token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setData(response.data)
    } catch (error) {
      console.error("fetchOrders error:", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <div className="table-responsive">
            <table className="table">
              <tbody>
                {data.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <img src={assets.delivery} alt="food" height={48} width={48} />
                    </td>

                    <td>
                      {order.orderedItems?.map((item, i) => (
                        <span key={i}>
                          {item.name} x {item.quantity}
                          {i !== order.orderedItems.length - 1 && ", "}
                        </span>
                      ))}
                    </td>

                    <td>₹{order.amount}</td>

                    <td>Items: {order.orderedItems?.length || 0}</td>

                    <td className="fw-bold text-capitalize">
                      ● {order.orderStatus}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={fetchOrders}
                      >
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyOrders
