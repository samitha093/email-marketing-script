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
const url = 'http://localhost:8000/delivery/';

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

export default function CustomizedDialogs1(props) {
    const [open, setOpen] = useState(false);
    const [Host, sethost] = useState('');
    const [From, setfrom] = useState('');
    const [Port, setport] = useState('');
    const [security, setusecurity] = useState('');
    const [UserName, setusername] = useState('');
    const [Password, setPassword] = useState('');
    const [QTY, setqty] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        axios
            .get(url + props.id)
            .then((res) => {
                sethost(res.data.host);
                setfrom(res.data.from);
                setport(res.data.port);
                setusecurity(res.data.protocol);
                setusername(res.data.username);
                setPassword(res.data.password);
                setqty(res.data.size);
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
            host: Host,
            port: Port,
            username: UserName,
            password: Password,
            protocol: security,
            from: From,
            size: QTY
        };
        axios
            .put(url + props.id, Server)
            .then((res) => {
                setOpen(false);
                sethost(res.data.host);
                setfrom(res.data.from);
                setport(res.data.port);
                setusecurity(res.data.protocol);
                setusername(res.data.username);
                setPassword(res.data.password);
                setqty(res.data.size);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChange = (event) => {
        setusecurity(event.target.value);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Delivery Server
                </BootstrapDialogTitle>
                <DialogContent dividers>
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
