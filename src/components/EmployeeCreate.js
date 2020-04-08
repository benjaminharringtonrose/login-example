import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';

class EmployeeCreate extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane Smith"
            onChangeText={(text) =>
              this.props.employeeUpdate({ prop: 'name', value: 'text' })
            }
            value={this.props.name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            onChangeText={(text) =>
              this.props.employeeUpdate({ prop: 'phone', value: 'text' })
            }
            value={this.props.phone}
          />
        </CardSection>

        <CardSection>
          <Input label="Shift" placeholder="Morning" value={this.props.shift} />
        </CardSection>

        <CardSection>
          <Button>Create</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);
