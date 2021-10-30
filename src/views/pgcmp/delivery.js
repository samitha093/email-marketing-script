// material-ui
import * as React from 'react';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import DeliveryServer from './forms/deliveryform';

// ==============================|| SAMPLE PAGE ||============================== //

const Delivery = () => (
    <MainCard title="Delivery Servers">
        <Typography variant="body2">
            <DeliveryServer />
        </Typography>
    </MainCard>
);

export default Delivery;
