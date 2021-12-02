import React from 'react';

import { Table } from 'antd';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'SSN',
    dataIndex: 'ssn',
    key: 'ssn',
  },
];

class UserTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="userTable">
        <Table dataSource={this.props.users} loading={this.props.isLoading} columns={columns} />
      </div>
    );
  }
}

export default UserTable;