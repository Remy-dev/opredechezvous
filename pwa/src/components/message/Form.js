import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  renderField = data => {
    data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <div className={`form-group`}>
        <label
          htmlFor={`message_${data.input.name}`}
          className="form-control-label"
        >
          {data.input.name}
        </label>
        <input
          {...data.input}
          type={data.type}
          step={data.step}
          required={data.required}
          placeholder={data.placeholder}
          id={`message_${data.input.name}`}
        />
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          component={this.renderField}
          name="content"
          type="text"
          placeholder=""
        />
        <Field
          component={this.renderField}
          name="createdAt"
          type="dateTime"
          placeholder=""
        />
        <Field
          component={this.renderField}
          name="updatedAt"
          type="dateTime"
          placeholder=""
        />
        <Field
          component={this.renderField}
          name="author"
          type="text"
          placeholder=""
        />
        <Field
          component={this.renderField}
          name="conversation"
          type="text"
          placeholder=""
        />

        <button type="submit" className="btn btn-success mb-2">
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'message',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
