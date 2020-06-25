import React, { Component } from 'react';
import Menu from '../../components/Navigation/Menu/Menu';
import { connect } from 'react-redux';

class Layout extends Component {

  render() {
    return (
      <>
        <Menu isLoggedIn={this.props.isLoggedIn} />

        <main className="container">
          {this.props.children}
        </main>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
