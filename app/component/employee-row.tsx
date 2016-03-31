/// <reference path="../../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {ListGroupItem, Row, Col} from 'react-bootstrap';

require('./employee-row.scss');

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  salary: number;
  employerName: string;
  photoUri: string;
}

export class EmployeeRow extends React.Component<any, any> {
  
  state: IEmployee;
  clickDelegate: (employee: IEmployee) => void;
  
  constructor() {
    super();
    
    this.state = null;
  }
  
  componentDidMount() {
    let data = this.props.entity;
    this.setState(data);
    this.clickDelegate = this.props.clickDelegate;
  }
  
  onClick(e) {
    this.clickDelegate(this.state);
  }
  
  render() {
    if (this.state) {
      return (
      <ListGroupItem className="employee-row" onClick={this.onClick.bind(this)}>        
        <Row>
          <Col md={3}>
            <img src={this.state.photoUri} />
          </Col>
          <Col md={9}>
              {this.state.firstName + ' ' + this.state.lastName}<br />
              {this.state.employerName}
          </Col>
        </Row>
      </ListGroupItem>
      );
    }
    else {
      return <div></div>
    }
  }
}
