import React from 'react';

import { Form, Input, Button } from 'antd';
import userEvent from '@testing-library/user-event';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formValid: false };
  }

  formRef = React.createRef();

  onFinish = (values) => {
    this.props.handleSave(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
    this.setState({ formValid: false });
  };

  render() {
    const { users } = this.props;
    return (
      <div class='userForm'>
        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} 
          onValuesChange={() => this.setState({ formValid: this.formRef.current.isFieldsTouched(true) && this.formRef.current.getFieldsError().some((item) => item.errors.length > 0)})}
        >
          <Form.Item name="firstName" label="First Name" rules={[{ required: true, min: 2}]}>
            <Input disabled={this.props.isLoading} placeholder="First Name"/>
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={[{ required: true, min: 2 }]}>
            <Input disabled={this.props.isLoading} placeholder="Last Name"/>
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, min: 2 }]}>
            <Input disabled={this.props.isLoading} placeholder="Address"/>
          </Form.Item>
          <Form.Item 
            name="ssn" label="SSN"
            rules={[
              { required: true }, 
              { pattern: /[0-9]{3}-[0-9]{2}-[0-9]{4}/, message: 'SSN does not match pattern ###-##-####'},
              ({getFieldValue}) => ({
                validator(_, value) {
                  let duplicated = false;
                  users.forEach(user => {
                    if(user.ssn == value) {
                      duplicated = true;
                    }
                  });
                  if(duplicated)
                    return Promise.reject('SSN Duplicated');
                  else
                    return Promise.resolve();
                }
              })
            ]}
            hasFeedback
          >
            <Input disabled={this.props.isLoading} placeholder="###-##-####"/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div style={{float: 'right'}}>
              <Button style={{marginRight: '10px'}} htmlType="button" type="default" shape="round" onClick={this.onReset}>
                Reset
              </Button>
              <Button type="primary" type="primary" shape="round" htmlType="submit" disabled={!this.state.formValid}>
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default UserForm;