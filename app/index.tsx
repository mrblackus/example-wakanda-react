/// <reference path="../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {ListGroup, Row, Col} from 'react-bootstrap';
import * as WakandaClient from 'wakanda-client/browser';

import {EmployeeRow, IEmployee} from './component/employee-row.tsx';
import {EmployeeDetails} from './component/employee-detail.tsx';

require('./app.scss');

class RootComp extends React.Component<any, any> {
  
  state: {
    employees: IEmployee[],
    selectedEmployee: IEmployee
  }
  
  constructor() {
    super();
    
    this.state = {
      employees: [],
      selectedEmployee: null
    };
  }
  
  componentDidMount() {
    let client = new WakandaClient();
    
    client.getCatalog().then(ds => {
      ds.Employee.query({pageSize: 20}).then(collection => {
        this.setState({
          employees: collection.entities
        });
      });
    });
  }
  
  clickOnEmployee(employee: IEmployee) {
    this.setState({
      selectedEmployee: employee
    });
  }
  
  renderEmployee(employee: IEmployee) {
    return <EmployeeRow key={employee.ID} entity={employee} clickDelegate={this.clickOnEmployee.bind(this)} />
  }
  
  render() {
    return (
      <div>
        <h1>Employee list</h1>      
        <Row>
          <Col md={4}>
            {this.state.employees.map(this.renderEmployee.bind(this))}
          </Col>
          <Col md={8}>
            <EmployeeDetails employee={this.state.selectedEmployee} />
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(
  <RootComp />,
  document.getElementById('react-mount')
);
