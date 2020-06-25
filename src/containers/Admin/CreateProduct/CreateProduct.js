import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import { createControl, validate, validateForm } from '../../../form/formFrame';
import { connect } from 'react-redux';
import { createProduct } from '../../../store/actions/product';

function createFormControls() {
  return {
    title: createControl({
      label: 'Name',
      errorMessage: 'Name can\'t be empty',
      value: '',
    }, {required: true}),
    manufacturer: createControl({
      label: 'Manufacturer',
      errorMessage: 'Manufacturer can\'t be empty',
      value: '',
    }, {required: true}),
    cost: createControl({
      label: 'Cost',
      type: 'number',
      errorMessage: 'Cost can\'t be empty',
      value: '',
    }, {required: true}),
  };
}

class CreateProduct extends Component {

  state = {
    isFormValid: false,
    formControls: createFormControls(),
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event.target.value, controlName)}
        />
      );
    });
  }

  submit = (event) => {
    event.preventDefault();
  }

  create = () => {
    const product = {
      title: this.state.formControls.title.value,
      manufacturer: this.state.formControls.manufacturer.value,
      cost: this.state.formControls.cost.value,
      date: Date.now(),
    };

    this.props.createProduct(product).then(() =>
      this.props.history.push("/admin/dashboard")
    );
  }

  render() {
    return (
      <form onSubmit={this.submit} className="manage-form mt-3">
        <h1 className="text-center">Create product</h1>

        {this.renderInputs()}

        <button
          type="submit"
          className="btn btn-dark"
          onClick={this.create}
          disabled={!this.state.isFormValid}
        >
          Create
        </button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createProduct: (item) => dispatch(createProduct(item)),
  };
}

export default connect(null, mapDispatchToProps)(CreateProduct);
