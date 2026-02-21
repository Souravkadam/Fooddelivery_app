import axios from "axios";

const API_URL = "http://localhost:8080/api/cart";

// ✅ ADD TO CART
export const addToCart = async (foodId, token) => {
  try {
    const response = await axios.post(
      API_URL,
      { foodId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while adding cart data", error.response?.data || error);
    throw error;
  }
};

// ✅ REMOVE QUANTITY FROM CART
export const removeQtyFromCart = async (foodId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/remove`,
      { foodId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while removing qty from cart", error.response?.data || error);
    throw error;
  }
};

// ✅ GET CART DATA
export const getCartData = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error while fetching cart data", error.response?.data || error);
    throw error;
  }
};

// ✅ CLEAR CART (RECOMMENDED)
export const clearCart = async (token) => {
  try {
    const response = await axios.delete(`${API_URL}/clear`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while clearing cart", error.response?.data || error);
    throw error;
  }
};
