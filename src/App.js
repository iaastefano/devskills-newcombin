import React from 'react';
import './Style/css/App.css';
import { Layout, Row, Col, message } from 'antd';
import MainMenu from './components/MainMenu';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import IdleTimerContainer from './components/IdleTimerContainer';

import axios from 'axios';

const { Header, Content, Footer } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    console.log('fetching users');
    let auth = await axios.post('http://localhost:8081/auth', {
      "username": "sarah",
      "password": "connor"
    }); 

    let response = await axios.get('http://localhost:8081/api/members', { headers: { Authorization: 'Bearer ' + auth.data.token }});

    this.setState({
      users: response.data, 
      isLoading: false
    });
    console.log('users fetched');
  }

  handleSave = async (values) => {
    this.setState({ isLoading: true });

    let auth = await axios.post('http://localhost:8081/auth', {
      "username": "sarah",
      "password": "connor"
    }); 

    axios.post(
      'http://localhost:8081/api/members', 
      values,
      { headers: { Authorization: 'Bearer ' + auth.data.token }}
    ).then(response => {
      if(response.statusText == 'OK') {
        const newUser = {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          ssn: values.ssn
        };
        
        this.setState(prevState => ({
          users: [...prevState.users, newUser]
        }));

        message.success('User succesfully created');
      }
      else {
        message.info('Error creating user: ' + response.data);
      }
    })
    .catch(error => {
      message.error(error.response.data.message);
    })
    .finally(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    return (
      <div>
        <IdleTimerContainer onIdle={(e) => { this.fetchUsers(); message.info('Two minutes being idle, users refetched.') } }>
        </IdleTimerContainer>
        <Layout>
          <Header>
            <MainMenu></MainMenu>
          </Header>
            <Content>
              <Row>
                <Col span={6}>
                  <UserForm users={this.state.users} handleSave={this.handleSave} isLoading={this.state.isLoading}></UserForm>
                </Col>
                <Col span={18}>
                  <UserTable users={this.state.users} isLoading={this.state.isLoading}></UserTable>
                </Col>
              </Row>
            </Content>
          <Footer>
            <Row>
              <Col span={6}>
                © Copyright 
              </Col> 
              <Col span={18} style={{textAlign: 'right'}}>
                ® All rights reserved 
              </Col>
            </Row>
          </Footer>
        </Layout>
      </div>
    )
  };
}

export default App;
