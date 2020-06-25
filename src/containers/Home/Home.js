import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllProducts } from '../../store/actions/product';
import ProductItem from '../../components/ProductItem/ProductItem';
import Loader from '../../components/UI/Loader/Loader';

class Home extends Component {

  state = {
    products: []
  }

  async componentDidMount() {
    const products = await this.props.fetchAllProducts();
    this.setState({ products });
  }

  render() {
    return (
      <div>
        { 
          this.props.loading || !this.state.products.length
          ? <Loader />
          : this.state.products.map((product, index) => {
              return (
                <ProductItem key={index} product={product} />
              );
            })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.product.loading,
    products: state.product.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
