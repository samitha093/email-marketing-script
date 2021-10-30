/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import { TextField, Divider, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import CustomizedDialogs4 from './popup/campain';

const url = 'http://localhost:8000/campain/';

const url1 = 'http://localhost:8000/delivery/';
const url2 = 'http://localhost:8000/template/';
const url3 = 'http://localhost:8000/list/';

const Campain = ({ ...others }) => {
    const [items, setitems] = useState([]);
    const [templateitems, settemplateitems] = useState([]);
    const [listitems, setlistitems] = useState([]);
    const [serveritems, setserveritems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState('');
    const [listname, setListname] = useState('');
    const [name, setname] = useState('');
    const [timeLeft, setTimeLeft] = useState(1);
    useEffect(() => {
        axios
            .get(url2)
            .then((res) => {
                settemplateitems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(url3)
            .then((res) => {
                setlistitems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(url1)
            .then((res) => {
                setserveritems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(url)
            .then((res) => {
                setitems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        const intervalId = setInterval(() => {
            setTimeLeft((t) => t + 1);
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setitems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [timeLeft]);

    const menuItems = templateitems.map((items) => (
        <MenuItem key={items.id} value={items.id}>
            {items.templatename}
        </MenuItem>
    ));
    const menuItems2 = listitems.map((items) => (
        <MenuItem key={items.id} value={items.id}>
            {items.listname}
        </MenuItem>
    ));
    const handleChange = (event) => {
        setListname(event.target.value);
    };
    const handleChange2 = (event) => {
        setList(event.target.value);
    };

    function handleClick() {
        setLoading(true);
        const Server = {
            cmpname: name,
            tempid: listname,
            listid: list
        };
        axios
            .post(url, Server)
            .then((ress) => {
                setname('');
                setListname('');
                setList('');
                axios
                    .get(url)
                    .then((res) => {
                        setitems(res.data);
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
    async function handleClickdelete(id) {
        axios
            .delete(url + id)
            .then(() => {
                axios
                    .get(url)
                    .then((res) => {
                        setitems(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    async function handleClickdesable(id) {
        const newurl = `${url}run/`;
        axios
            .put(newurl + id)
            .then(() => {
                axios
                    .get(url)
                    .then((res) => {
                        setitems(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const listItems = items.map((items) => (
        <div className="server-card" key={items.id}>
            <div className="server-card-left50">
                <p className="server-head">Campain Name : {items.cmpname} </p>
            </div>
            <div className="order-card_header25">
                {items.size}
                <div className="order-card_header25_green">({(items.sended / items.size) * 100}%)</div>
            </div>
            <div className="order-card_header-right25">
                <Button variant="contained" color="error" onClick={() => handleClickdelete(items.id)}>
                    Delete
                </Button>
                <CustomizedDialogs4 id={items.id} />
                <Button variant="contained" disabled={items.status} color="primary" onClick={() => handleClickdesable(items.id)}>
                    Run
                </Button>
            </div>
        </div>
    ));
    return (
        <>
            <div className="outlined-basic-bpn">
                <div className="outlined-basic-bpx">
                    <TextField
                        fullWidth
                        sx={{ m: 1 }}
                        value={name}
                        id="outlined-basic"
                        onChange={(e) => setname(e.target.value)}
                        label="Campain Name"
                        variant="outlined"
                    />
                </div>
                <div className="outlined-basic-bpx">
                    <Select
                        fullWidth
                        sx={{ m: 1 }}
                        value={listname}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Select Template </em>
                        </MenuItem>
                        {menuItems}
                    </Select>
                </div>
            </div>
            <div className="outlined-basic-bpn">
                <div className="outlined-basic-bpx">
                    <Select
                        fullWidth
                        sx={{ m: 1 }}
                        value={list}
                        onChange={handleChange2}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Select Contact list </em>
                        </MenuItem>
                        {menuItems2}
                    </Select>
                </div>
                <div className="outlined-basic-bpx">
                    <div className="outlined-basic-bpx">
                        <div className="save-server22">
                            <LoadingButton
                                onClick={handleClick}
                                endIcon={<SaveIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                Create New Campain
                            </LoadingButton>
                        </div>
                    </div>
                </div>
            </div>
            <Divider className="top-div" />
            <div>{listItems}</div>
        </>
    );
};
export default Campain;
