/// <reference path="../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {ListGroup, Row, Col} from 'react-bootstrap';
import * as WakandaClient from 'wakanda-client/browser';

import {EmployeeRow, IEmployee} from './component/employee-row.tsx';

require('./app.scss');

class RootComp extends React.Component<any, any> {
  
  state: {
    employees: IEmployee[]
  }
  
  constructor() {
    super();
    
    this.state = {
      employees: []
    };
  }
  
  componentDidMount() {
    let client = new WakandaClient();
    
    client.getCatalog().then(ds => {
      ds.Employee.query({pageSize: 20}).then(collection => {
        
        let employees = collection.entities.map(e => {
          
          return {
            id: e.ID,
            firstName: e.firstName,
            lastName: e.lastName,
            salary: e.salary,
            employerName: e.employerName,
            photoUri: e.photo.uri
          };
        });
        
        this.setState({
          employees
        });
      });
    });
  }
  
  clickOnEmployee(employee: IEmployee) {
    console.log('click on employee', employee);
  }
  
  renderEmployee(employee: IEmployee) {
    return <EmployeeRow key={employee.id} entity={employee} clickDelegate={this.clickOnEmployee.bind(this)} />
  }
  
  render() {
    return (
      <Row>
        <Col md={4}>
          <h1>Employee list</h1>
          {this.state.employees.map(this.renderEmployee.bind(this))}
        </Col>
        <Col md={8}>
        </Col>
      </Row>
    );
  }
}

ReactDOM.render(
  <RootComp />,
  document.getElementById('react-mount')
);
