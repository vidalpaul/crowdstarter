import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';

class ContributeForm extends Component {
   state = { value: '', loading: false };

   onSubmit = (event) => {
      event.preventDefault();
      loading: true;
      const campaign = Campaign(this.props.address);
      try {
      } catch (err) {}
      loading: false;
   };

   render() {
      return (
         <Form onSubmit={this.onSubmit}>
            <Form.Field>
               <label>Amount to contribute</label>
               <Input
                  value={this.state.value}
                  onChange={(event) =>
                     this.setState({ value: event.target.value })
                  }
                  label='ether'
                  labelPosition='right'
               />
               <Button primary>Contribute</Button>
            </Form.Field>
         </Form>
      );
   }
}

export default ContributeForm;
