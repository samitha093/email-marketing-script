// material-ui
import { useState, useEffect } from 'react';
import { Typography, TextField, Divider, Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Campain from './forms/campaign';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Campaigns = () => (
    <MainCard title="Email Campaigns">
        <Typography variant="body2">
            <Campain />
        </Typography>
    </MainCard>
);

export default Campaigns;
