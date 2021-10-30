import { useState, useEffect, cloneElement } from 'react';
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
// URL
const url = 'http://localhost:8000/list/';

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

export default function CustomizedDialogs2(props) {
    const [open, setOpen] = useState(false);
    const [list, setlist] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        axios
            .get(url + props.id)
            .then((res) => {
                setlist(res.data.list);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickdelete = (emailaddress) => {
        const newurl = `${url}email/${props.id}/${emailaddress}`;
        axios
            .delete(newurl)
            .then(() => {
                axios
                    .get(url + props.id)
                    .then((res) => {
                        setlist(res.data.list);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const listItems = list.map((items) => (
        <div>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" onClick={() => handleClickdelete(items)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={items} />
            </ListItem>
        </div>
    ));
    return (
        <div>
            <Button variant="outlined" style={{ height: '50px' }} onClick={handleClickOpen}>
                Edit
            </Button>
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit List
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div>{listItems}</div>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
