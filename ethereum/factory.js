import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
   JSON.parse(CampaignFactory.interface),
   '0xF3339336952C773A32D5219aB8927Be635FC0C37'
);

export default instance;
