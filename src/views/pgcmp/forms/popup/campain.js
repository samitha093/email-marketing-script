import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
// URL
const url = 'http://localhost:8000/campain/';

const url1 = 'http://localhost:8000/delivery/';
const url2 = 'http://localhost:8000/template/';
const url3 = 'http://localhost:8000/list/';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, id, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

export default function CustomizedDialogs4(props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setitems] = useState([]);
    const [templateitems, settemplateitems] = useState([]);
    const [listitems, setlistitems] = useState([]);
    const [serveritems, setserveritems] = useState([]);
    const [list, setList] = useState('');
    const [listname, setListname] = useState('');
    const [name, setname] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
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
            .get(url + props.id)
            .then((res) => {
                setitems(res.data);
                setList(res.data.listid);
                setListname(res.data.tempid);
                setname(res.data.cmpname);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSavechanges = () => {
        const Server = {
            cmpname: name,
            tempid: listname,
            listid: list
        };
        axios
            .put(url + props.id, Server)
            .then((ress) => {
                console.log(ress);
            })
            .catch((err) => {
                console.log(err);
            });
        setOpen(false);
    };
    const handleChange = (event) => {
        setListname(event.target.value);
    };
    const handleChange2 = (event) => {
        setList(event.target.value);
    };
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

    return (
        <div>
            <Button variant="outlined" style={{ height: '50px' }} onClick={handleClickOpen}>
                Edit
            </Button>
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Delivery Server
                </BootstrapDialogTitle>
                <DialogContent dividers>
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
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSavechanges}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
