import React, { Component } from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

export class CampaignShow extends Component {
   static async getInitialProps(props) {
      const campaignAddress = props.query.address;
      const campaign = Campaign(campaignAddress);
      // process return from getSummary()
      const summary = await campaign.methods.getSummary().call();
      return {
         minimumContribution: summary[0],
         balance: summary[1],
         requestsCount: summary[2],
         approversCount: summary[3],
         manager: summary[4],
         address: campaignAddress,
      };
   }

   renderCards() {
      const {
         minimumContribution,
         balance,
         requestsCount,
         approversCount,
         manager,
      } = this.props;
      const items = [
         {
            header: manager,
            meta: 'Address of manager',
            description:
               'The manager created this campaign and can create requests to withdraw money',
            style: { overflowWrap: 'break-word' },
         },
         {
            header: minimumContribution,
            meta: 'Minimum contribution (wei)',
            description:
               'You must contribute at least this much wei to become an approver',
            style: { overflowWrap: 'break-word' },
         },
         {
            header: requestsCount,
            meta: 'Number of requests',
            description:
               'A request tries to withdraw money from the contract. Requests must be approved by approvers',
            style: { overflowWrap: 'break-word' },
         },
         {
            header: approversCount,
            meta: 'Number of Approvers',
            description:
               'Number of people who have already donated to this campaign',
            style: { overflowWrap: 'break-word' },
         },
         {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Campaign balance (ether)',
            description: 'How much money this campaign has left to spend',
            style: { overflowWrap: 'break-word' },
         },
      ];
      return <Card.Group items={items} />;
   }

   render() {
      return (
         <Layout>
            <h3>Campaign Show</h3>
            <Grid>
               <Grid.Row>
                  <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
                  <Grid.Column width={6}>
                     <ContributeForm address={this.props.address} />
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <Grid.Column>
                     <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>
                           <Button primary>View Requests</Button>
                        </a>
                     </Link>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Layout>
      );
   }
}

export default CampaignShow;
