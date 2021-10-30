/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import { TextField, Divider, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CustomizedDialogs3 from './popup/template';
import ReactQuill from 'react-quill';
import '../../../../node_modules/react-quill/dist/quill.snow.css';
import '../../../../node_modules/froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';

import App from 'App';

const url = 'http://localhost:8000/template/';

const Emailtemp = ({ ...others }) => {
    const [items, setitem] = useState([]);
    const [body, setbody] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setname] = useState('');
    const [Subject, setsubject] = useState('');
    function handleClick() {
        setLoading(true);
        const temp = {
            templatename: name,
            subject: Subject,
            htmlcord: body
        };
        axios
            .post(url, temp)
            .then((ress) => {
                setname('');
                setsubject('');
                setbody('');
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
            <div className="server-card-left75">
                <p className="server-head">Email List Name : {items.templatename} </p>
            </div>
            <div className="order-card_header-right25">
                <Button variant="contained" color="error" onClick={() => handleClickdelete(items.id)}>
                    Delete
                </Button>
                <CustomizedDialogs3 id={items.id} />
            </div>
        </div>
    ));

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
        <>
            <div className="outlined-basic-bpn">
                <div className="outlined-basic-bpx">
                    <TextField
                        fullWidth
                        sx={{ m: 1 }}
                        value={name}
                        id="outlined-basic"
                        onChange={(e) => setname(e.target.value)}
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
                <ReactQuill style={{ height: '500px' }} modules={modules} formats={formats} theme="snow" value={body} onChange={setbody} />
            </div>
            <div className="outlined-basic-bpn33">
                <div className="outlined-basic-bpx3">
                    <div className="save-server223">
                        <LoadingButton
                            onClick={handleClick}
                            endIcon={<SaveIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Save Template
                        </LoadingButton>
                    </div>
                </div>
            </div>
            <Divider className="top-div" />
            <div>{listItems}</div>
        </>
    );
};
export default Emailtemp;
