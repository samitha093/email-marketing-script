/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import { TextField, Divider, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CustomizedDialogs2 from './popup/list';

const url = 'http://localhost:8000/list/';

const EmailList = ({ ...others }) => {
    const [items, setitem] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [newlistname, setnewListname] = useState('');
    const [listname, setListname] = useState('');
    const [Email, setemail] = useState('');
    function handleClick1() {
        setLoading1(true);
        const Server = {
            listname: newlistname,
            list: []
        };
        axios
            .post(url, Server)
            .then((ress) => {
                setnewListname('');
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
        setLoading1(false);
    }
    function handleClick2() {
        setLoading2(true);
        const newemail = {
            email: Email
        };
        axios
            .put(url + listname, newemail)
            .then((ress) => {
                setemail('');
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading2(false);
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
    const listItems = items.map((items) => (
        <div className="server-card" key={items.id}>
            <div className="server-card-left50">
                <p className="server-head">Email List Name : {items.listname} </p>
            </div>
            <div className="order-card_header25">{items.list.length}</div>
            <div className="order-card_header-right25">
                <Button variant="contained" color="error" onClick={() => handleClickdelete(items.id)}>
                    Delete
                </Button>
                <CustomizedDialogs2 id={items.id} />
            </div>
        </div>
    ));
    const menuItems = items.map((items) => (
        <MenuItem key={items.id} value={items.id}>
            {items.listname}
        </MenuItem>
    ));
    const handleChange = (event) => {
        setListname(event.target.value);
    };
    return (
        <>
            <div className="outlined-basic-bpn">
                <div className="outlined-basic-bpx">
                    <TextField
                        fullWidth
                        sx={{ m: 1 }}
                        value={newlistname}
                        id="outlined-basic"
                        onChange={(e) => setnewListname(e.target.value)}
                        label="New List Name"
                        variant="outlined"
                    />
                </div>
                <div className="outlined-basic-bpx">
                    <LoadingButton
                        fullWidth
                        sx={{ m: 1 }}
                        onClick={handleClick1}
                        endIcon={<SaveIcon />}
                        loading={loading1}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Create New List
                    </LoadingButton>
                </div>
            </div>
            <Divider className="top-down-div" />
            <div className="outlined-basic-bpn">
                <div className="outlined-basic-bpx">
                    <TextField
                        fullWidth
                        sx={{ m: 1 }}
                        value={Email}
                        id="outlined-basic"
                        onChange={(e) => setemail(e.target.value)}
                        label="Email Address"
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
                            <em>Select Email List </em>
                        </MenuItem>
                        {menuItems}
                    </Select>
                </div>
            </div>
            <div className="outlined-basic-bpn3">
                <div className="outlined-basic-bpx">
                    <div className="save-server22">
                        <LoadingButton
                            onClick={handleClick2}
                            endIcon={<SaveIcon />}
                            loading={loading2}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Save Email
                        </LoadingButton>
                    </div>
                </div>
            </div>
            <Divider className="top-div" />
            <div>{listItems}</div>
        </>
    );
};
export default EmailList;
