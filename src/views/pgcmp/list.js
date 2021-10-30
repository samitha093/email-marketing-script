// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import EmailList from './forms/list';
// ==============================|| SAMPLE PAGE ||============================== //

const List = () => (
    <MainCard title="Contact Lists">
        <div>
            <EmailList />
        </div>
    </MainCard>
);

export default List;
