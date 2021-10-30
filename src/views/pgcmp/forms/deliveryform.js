/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import CustomizedDialogs1 from './popup/delivery';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import axios from 'axios';
// assets
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
// URL
const url = 'http://localhost:8000/delivery/';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const DeliveryServer = ({ ...others }) => {
    const [items, setitem] = useState([]);
    const [loading, setLoading] = useState(false);

    const [Host, sethost] = useState('');
    const [From, setfrom] = useState('');
    const [Port, setport] = useState('');
    const [security, setusecurity] = useState('');
    const [UserName, setusername] = useState('');
    const [Password, setPassword] = useState('');
    const [QTY, setqty] = useState('');

    function handleClick() {
        setLoading(true);
        const Server = {
            host: Host,
            port: Port,
            username: UserName,
            password: Password,
            protocol: security,
            from: From,
            size: QTY
        };
        axios
            .post(url, Server)
            .then((ress) => {
                sethost('');
                setfrom('');
                setport('');
                setusecurity('Select Protocol');
                setusername('');
                setPassword('');
                setqty('');
                axios
                    .get(url)
                    .then((res) => {
                        setitem(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    }
    const handleChange = (event) => {
        setusecurity(event.target.value);
    };
    async function handleClickdelete(id) {
        axios
            .delete(url + id)
            .then(() => {
                axios
                    .get(url)
                    .then((res) => {
                        setitem(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setitem(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const listItems = items.map((items) => (
        <div className="server-card" key={items.id}>
            <div className="server-card-left">
                <p className="server-head">Server Host : </p>
                <p className="server-head">From Email : </p>
                <p className="server-head">Port : </p>
                <p className="server-head">Protocol : </p>
                <p className="server-head">User Name : </p>
                <p className="server-head">Limit : </p>
                <CustomizedDialogs1 id={items.id} />
            </div>
            <div className="order-card_header-right">
                <p className="order-card_head_title">{items.host}</p>
                <p className="order-card_head_price">{items.from}</p>
                <p className="order-card_head_price">{items.port}</p>
                <p className="order-card_head_price">{items.protocol}</p>
                <p className="order-card_head_price">{items.username}</p>
                <p className="order-card_head_price">{items.size}</p>
                <Button variant="contained" color="error" onClick={() => handleClickdelete(items.id)}>
                    Delete
                </Button>
            </div>
        </div>
    ));

    return (
        <>
            <div>
                <div className="outlined-basic-bpn">
                    <div className="outlined-basic-bpx">
                        <TextField
                            fullWidth
                            sx={{ m: 1 }}
                            value={Host}
                            id="outlined-basic"
                            onChange={(e) => sethost(e.target.value)}
                            label="Host Name"
                            variant="outlined"
                        />
                    </div>
                    <div className="outlined-basic-bpx">
                        <TextField
                            fullWidth
                            sx={{ m: 1 }}
                            value={From}
                            id="outlined-basic"
                            onChange={(e) => setfrom(e.target.value)}
                            label="From Email"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="outlined-basic-bpn">
                    <div className="outlined-basic-bpx">
                        <TextField
                            fullWidth
                            sx={{ m: 1 }}
                            value={Port}
                            id="outlined-basic"
                            onChange={(e) => setport(e.target.value)}
                            label="Port"
                            variant="outlined"
                        />
                    </div>
                    <div className="outlined-basic-bpx">
                        <Select
                            fullWidth
                            sx={{ m: 1 }}
                            value={security}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>Select Protocol </em>
                            </MenuItem>
                            <MenuItem value="SSL">SSL</MenuItem>
                            <MenuItem value="TLS">TLS</MenuItem>
                            <MenuItem value="STARTTLS">STARTTLS</MenuItem>
                        </Select>
                    </div>
                </div>
                <div className="outlined-basic-bpn">
                    <div className="outlined-basic-bpx">
                        <TextField
                            fullWidth
                            sx={{ m: 1 }}
                            value={UserName}
                            id="outlined-basic"
                            onChange={(e) => setusername(e.target.value)}
                            label="User Name"
                            variant="outlined"
                        />
                    </div>
                    <div className="outlined-basic-bpx">
                        <TextField
                            fullWidth
                            sx={{ m: 1 }}
                            value={Password}
                            type="password"
                            id="outlined-basic"
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="outlined-basic-bpn">
                    <div className="outlined-basic-bpx">
                        <TextField
                            fullWidth
                            sx={{ m: 1 }}
                            value={QTY}
                            id="outlined-basic"
                            onChange={(e) => setqty(e.target.value)}
                            label="Daily Email Capacity"
                            variant="outlined"
                        />
                    </div>
                    <div className="outlined-basic-bpx">
                        <div className="save-server">
                            <LoadingButton
                                onClick={handleClick}
                                endIcon={<SaveIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                Save this Server
                            </LoadingButton>
                        </div>
                    </div>
                </div>
                <Divider className="top-div" />
                <div className="server-container">{listItems}</div>
            </div>
        </>
    );
};

export default DeliveryServer;
