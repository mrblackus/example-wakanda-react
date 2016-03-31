/// <reference path="../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {ListGroup, Row, Col, Input, Button} from 'react-bootstrap';
import * as WakandaClient from 'wakanda-client/browser';

import {EmployeeRow, IEmployee} from './component/employee-row.tsx';
import {EmployeeDetails} from './component/employee-detail.tsx';

require('./app.scss');

class RootComp extends React.Component<any, any> {
  
  state: {
    employees: IEmployee[],
    selectedEmployee: IEmployee
  }
  ds: any;
  
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
      this.ds = ds;
      this.refreshEmployeeList();
    });    
  }
  
  refreshEmployeeList() {
    this.ds.Employee.query({pageSize: 20}).then(collection => {
        this.setState({
          employees: collection.entities
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
  
  addEmployee() {
    //Not very clean way to grab ds
    let employee = this.ds.Employee.create();
    
    employee.firstName = this.refs.firstName.getValue();
    employee.lastName = this.refs.firstName.getValue();
    employee.salary = this.refs.salary.getValue();
    employee.employerName = this.refs.employer.getValue();
    
    employee.save().then(() => {
      this.refreshEmployeeList();
    })
  }
  
  render() {    
    return (
      <div>
        <h1>Employee list</h1>
        <div className="add-form">
          <form onSubmit={this.addEmployee.bind(this)}>
            <Input type="text" ref="firstName" placeholder="Firstname" value={null} /><br />
            <Input type="text" ref="lastName" placeholder="Lastname" /><br />
            <Input type="number" ref="salary" placeholder="Salary" /><br />
            <Input type="text" ref="employer" placeholder="Employer" /><br />
            <Button bsStyle="primary" onClick={this.addEmployee.bind(this)}>Add</Button>
          </form>
        </div>
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
