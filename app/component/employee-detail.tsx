/// <reference path="../../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {Panel, Button} from 'react-bootstrap';

import {IEmployee} from './employee-row.tsx'

require('./employee-detail.scss');

export class EmployeeDetails extends React.Component<any, any> {
  
  state: {
    currentEmployee: IEmployee
  };
  
  constructor() {
    super();
    
    this.state = {
      currentEmployee: null
    };
  }
    
  componentWillReceiveProps(newProps) {
    this.setState({
      currentEmployee: newProps.employee
    });
  }
      
  render() {
    if (this.state.currentEmployee) {
      let employee = this.state.currentEmployee;
      return (
        <Panel className="employee-details">
          <p>
            <img className="profil-pic" src={employee.photo.uri} />
            {employee.firstName + ' ' + employee.lastName} (ID #{employee.ID})
          </p>
          <p>
            <strong>Company:</strong> {employee.employerName}<br />
            <strong>Salary:</strong> ${employee.salary}
          </p>
        </Panel>
      );
    }
    else {
      return <div></div>
    }
  }
}
