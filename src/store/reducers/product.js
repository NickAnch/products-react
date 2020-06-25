import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_START,
  REMOVE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: null,
  loading: false
};

export default function productReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.product,
      };
    case REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.id),
      }
    case EDIT_PRODUCT_START:
        return {
          ...state,
          loading: true,
        };
    case EDIT_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false
        }
    default:
      return state;
  }
}
