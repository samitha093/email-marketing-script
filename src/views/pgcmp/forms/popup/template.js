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
import ReactQuill from 'react-quill';
// URL
const url = 'http://localhost:8000/template/';

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

export default function CustomizedDialogs3(props) {
    const [open, setOpen] = useState(false);
    const [Templatename, settemplatename] = useState([]);
    const [Subject, setsubject] = useState([]);
    const [Htmlcord, sethtmlcord] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        axios
            .get(url + props.id)
            .then((res) => {
                settemplatename(res.data.templatename);
                setsubject(res.data.subject);
                sethtmlcord(res.data.htmlcord);
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
            templatename: Templatename,
            subject: Subject,
            htmlcord: Htmlcord
        };
        axios
            .put(url + props.id, Server)
            .then((res) => {
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
            ['code-block']
        ],
        clipboard: {
            matchVisual: true
        }
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block'
    ];
    return (
        <div>
            <Button variant="outlined" style={{ height: '50px' }} onClick={handleClickOpen}>
                Edit
            </Button>
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Template
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div>
                        <div className="outlined-basic-bpn">
                            <div className="outlined-basic-bpx">
                                <TextField
                                    fullWidth
                                    sx={{ m: 1 }}
                                    value={Templatename}
                                    id="outlined-basic"
                                    onChange={(e) => settemplatename(e.target.value)}
                                    label="Template Name"
                                    variant="outlined"
                                />
                            </div>
                            <div className="outlined-basic-bpx">
                                <TextField
                                    fullWidth
                                    sx={{ m: 1 }}
                                    value={Subject}
                                    id="outlined-basic"
                                    onChange={(e) => setsubject(e.target.value)}
                                    label="Subject"
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div>
                            <ReactQuill
                                style={{ height: '500px' }}
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                value={Htmlcord}
                                onChange={sethtmlcord}
                            />
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
