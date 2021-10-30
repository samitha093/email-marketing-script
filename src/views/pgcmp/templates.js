// material-ui
import { Typography } from '@mui/material';
import Emailtemp from './forms/templates';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Templates = () => (
    <MainCard title="Email Templates">
        <Typography variant="body2">
            <Emailtemp />
        </Typography>
    </MainCard>
);

export default Templates;
