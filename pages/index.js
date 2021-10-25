import React, { Component } from 'react';
import { Link } from 'next';
import { Button, Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import 'semantic-ui-css/semantic.min.css';

export default class CampaignIndex extends Component {
   static async getInitialProps() {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      return { campaigns };
   }

   renderCampaigns() {
      const items = this.props.campaigns.map((address) => {
         return {
            header: address,
            description: <a>View Campaign</a>,
            fluid: true,
         };
      });
      return <Card.Group items={items} />;
   }

   render() {
      return (
         <>
            <Layout>
               <div>
                  <h3>Open Campaigns</h3>
                  <Button
                     content='Create campaign'
                     icon='add circle'
                     primary
                     floated='right'
                  />
                  {this.renderCampaigns()}
               </div>
            </Layout>
         </>
      );
   }
}
