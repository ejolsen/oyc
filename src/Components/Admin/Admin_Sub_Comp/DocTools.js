import React, {Component} from 'react';
import '../admin.css';
import axios from 'axios';
import Dropzone from 'react-dropzone'; 
import deleteIcon from './../../../images/delete_icon.png';
import uploaderIcon from './../../../images/uploader.svg';

class DocTools extends Component {
    constructor() {
        super();
        this.state = {
            docs: []
        };
        this.handleDelete = this.handleDelete.bind(this);
    };

    componentDidMount() {
        this.getClubDocs()
    };

    getClubDocs() {
        axios.get('/api/docs').then( res => this.setState({docs: res.data}));
    };

    onDrop = files => {
        let {REACT_APP_CLOUD_PRESET, REACT_APP_CLOUD_KEY, REACT_APP_CLOUD_NAME} = process.env;
        const uploaders = files.map(file => {
            const formData = new FormData();
            console.log(file)
            formData.append("file", file);
            formData.append("upload_preset", REACT_APP_CLOUD_PRESET); 
            formData.append("api_key", REACT_APP_CLOUD_KEY); 
            formData.append("timestamp", (Date.now() / 1000) | 0);
            formData.append("public_id", file.name);
          
            return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload/`, formData, {headers: { "X-Requested-With": "XMLHttpRequest" }}).then(res => {
                const fileData = res.data;
                const fileName = fileData.public_id
                const fileType = fileData.format
                const fileURL = fileData.url
                const deleteFileExt = (url) => {
                    const splitURL = url.split('')
                    splitURL.splice(splitURL.length - 4, 4)
                    return splitURL.join('') + '.png'
                }
                const fileIMG = deleteFileExt(fileData.url)
                const filePOST = {fileName, fileType, fileURL, fileIMG}
                console.log(fileData);
                axios.post(`/api/post/docs`, filePOST).then ( () => console.log('Document Posted'))
                this.getClubDocs()
            })
        });
    }

    handleDelete(id) { 
        axios.delete(`api/delete_doc/${id}`)
        .then( () => {
           this.getClubDocs()
        })
    };
  
    render() {
        console.log(this.state)
        let all_club_docs = this.state.docs.map( (doc) => {
            return (
                <div key={doc.doc_id} className='doc-card'>
                    <div className='doc-card-title'>{doc.doc_name}</div>
                    <div className='delete-butt'><img  src={deleteIcon} width='11' height='13' onClick={ () => this.handleDelete(doc.doc_id)}/></div>
                        <a href={doc.doc_url} target="_blank" rel="noopener noreferrer">
                            <img className='doc-img' src={doc.doc_img} alt='pdf doc' height='300px' width='200px'/>
                        </a>  
                </div>
            );
        });
        return (   
            <div className='docs-main-section'>
                <div className='docs-upload-section'>
                    <div className='docs-upload'>
                        <div className='file-uploader-title'>File Uploader</div><img src={uploaderIcon} width='100px' height='100px' alt='icon'/>
                        <Dropzone 
                            onDrop={this.onDrop} 
                            style={{
                                width: "90%", 
                                height: '400px', 
                                border: "dashed 1px black", 
                                display: "flex", 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                marginTop: '20px',
                                cursor: 'pointer'
                            }}>
                            <p className='dropbox-title'>DRAG AND DROP FILES HERE OR CLICK TO UPLOAD</p>
                        </Dropzone>
                    </div>


                    <div className='docs-section'>
                        <div className='docs-container-top'>
                            <div>Search Documents: <input/></div>
                        </div>
                        <div className='docs-container'>
                            {all_club_docs}
                        </div>
                    </div>
                </div>
                
            </div>    
        )
    };
};
  
export default DocTools