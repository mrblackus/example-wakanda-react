/// <reference path="../../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {Panel} from 'react-bootstrap';

import {IEmployee} from './employee-row.tsx'

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
      return (
        <Panel>
          {this.state.currentEmployee.firstName}
        </Panel>
      );
    }
    else {
      return <div></div>
    }
  }
}
