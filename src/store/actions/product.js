import axios from '../../axios/axiosProduct';
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_START,
  REMOVE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_SUCCESS,
} from '../actions/actionTypes';

const token = localStorage.getItem('react-app-token') || '';

// Fetching product(s)

export function fetchAllProducts() {
  return async dispatch => {
    dispatch(fetchProductsStart());
    try {
      const res = await axios.get('products.json');
      const products = Object.keys(res.data).map((key) => ({ ...res.data[key], id: key }));

      dispatch(fetchProductsSuccess(products));
      return products;
    } catch (e) {
      console.error(e);
    }
  }
}

export function fetchProductById(productId) {
  return async dispatch => {
    dispatch(fetchProductsStart());
    try {
      const res = await axios.get(`/products/${productId}.json`);
      const product = res.data;

      dispatch(fetchProductSuccess(product));
    } catch (e) {
      console.error(e);
    }
  }
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products,
  }
}

export function fetchProductSuccess(product) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    product,
  }
}

export function fetchProductsStart() {
  return {
    type: FETCH_PRODUCTS_START,
  }
}

// Remove product

export function removeProduct(id) {
  return async dispatch => {
    try {
      await axios.delete(`/products/${id}.json`, { params: { auth: token }});
      dispatch(removeProductSuccess(id));
    } catch (e) {
      console.error(e);
    }
  }
}

export function removeProductSuccess(id) {
  return {
    type: REMOVE_PRODUCT_SUCCESS,
    id
  }
}

// Create product

export function createProduct(product) {
  return async () => {
    try {
      await axios.post('/products.json', product, { params: { auth: token }});
    } catch (e) {
      console.error(e);
    }
  };
}

// Edit Product

export function editProduct(product) {
  return async dispatch => {
    dispatch(editProductStart());
    try {
      await axios.patch(`/products/${product.id}.json`, product, { params: { auth: token }});
      dispatch(editProductSuccess());
    } catch (e) {
      console.error(e);
    }
  }
}

export function editProductStart() {
  return {
    type: EDIT_PRODUCT_START,
  }
}

export function editProductSuccess() {
  return {
    type: EDIT_PRODUCT_SUCCESS,
  }
}
