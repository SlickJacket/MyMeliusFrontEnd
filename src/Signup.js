import React, { Component }  from 'react';
import { withRouter } from 'react-router-dom';
import ReactS3 from 'react-s3';
// import Dropzone from 'react-dropzone';
import ReactFileReader from 'react-file-reader';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { image64toCanvasRef } from './ReusableUtils';



const config = {
    bucketName: process.env.REACT_APP_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
}

class SignUp extends Component {


constructor() {
    super()
    // this.imagePreviewCanvasRef = React.createRef()
    this.blobToUrl = React.createRef()

    this.state = {
        name: "",
        password: "",
        email: "",
        title: "",
        company_id: '',
        user_id: '',
        imagelocation: '',
        imagefile: '',
        imageURL: '',
        imgSrc: '',
        src: null,
        crop: {
        unit: "%",
        width: 30,
        aspect: 1 / 1
    },
    croppedImg: '',
    b: null
    }
}


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClick = (e) => {
        e.preventDefault();


        let file = new File([this.state.b], this.state.email);

        ReactS3.uploadFile(file, config)
        .then(data => this.setState({imageURL: data.location}))
        .catch(err => console.error(err))

        alert('Image Saved!')
}
    

handleSubmit = (e) => {
    e.preventDefault()

//     ReactS3.uploadFile(this.state.imagefile, config)
// .then(data => this.setState({imageURL: data.location}))
// .catch(err => console.error(err))
// console.log(this.state.imageURL)

if (this.state.imageURL) {
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            "name": this.state.name,
            "password": this.state.password,
            "email": this.state.email,
            "company_id": this.state.company_id,
            "title": this.state.title,
            "image_url": this.state.imageURL
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (!data.errors) {
            localStorage.token = data.token
            localStorage.email = data.user.email
            localStorage.id = data.user.id
            this.props.getProfile()
            this.props.history.push('/profile')
        }
    })
} else {
    alert("You need to upload a photo")
}


}


fileChange(event){
    const { value } = event.target; 

    let ifImage = (/\.(jpg|jpeg|png)$/i).test(value)
    if(!ifImage){
        return alert("Image must be .JPG, .JPEG, or .PNG")
    }

    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        console.log(event.target.result)
    };

    reader.readAsText(file)
        // this.setState({imagefile: event.target.files[0]})

        
}

// handleFiles = (files) => {
//     this.setState({imgSrc: files.base64})
//     console.log(files.fileList[0])
//     this.setState({imagefile: files.fileList[0]})
//     } 

//     handleImageLoaded = (image) => {
//         console.log(image)
//     }

//     handleOnCropChange = (crop) => {
//         // console.log(crop)
//         this.setState({crop: crop})
//         // console.log(this.state.crop)
//     }

//     handleOnCropComplete = (crop, pixelCrop) => {
//         console.log(crop, pixelCrop)
//         console.log(this.state.imagefile)
//         console.log(this.state.imgSrc)

       
//         const canvasRef = this.imagePreviewCanvasRef .current
//     //    let {imgsrc} = this.state
//         image64toCanvasRef(canvasRef, this.state.imgSrc, pixelCrop)
//     }

//     renderPreviewImage = () => {
//         if (this.state.imgSrc !== null) {
//             // return <div id="previewDiv">
//                         {/* <img src={this.state.imgSrc} id="imgPreview" /> */}
//                         return <div><div id="previewDiv"> 
//                         <ReactCrop src={this.state.imgSrc} 
//                                             crop={this.state.crop} 
//                                             onImageLoaded={this.handleImageLoaded}
//                                             onComplete={this.handleOnCropComplete}
//                                             onChange={this.handleOnCropChange}
//                                             id="imgPreview"  />
//                             <br/> 
//                             {/* <canvas ref={this.imagePreviewCanvasRef } id="imgPrev"></canvas> */}
//                         </div>
//                         <canvas ref={this.imagePreviewCanvasRef } id="imgPrev"></canvas>
//                         </div>
//         }
//     }


    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
            this.setState({ src: reader.result })
        );
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
        console.log(crop)
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
        const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            "newFile.jpeg"
        );
        this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
        );

        return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
            }
            blob.name = fileName;
            this.setState({b: blob})
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
        }, "image/jpeg");
        });
    }


// <img src={this.state.imgSrc} />
    render() {
        // console.log(this.state.imageURL)
        console.log(this.state.b)
        console.log(this.state.imageURL)

        const { crop, croppedImageUrl, src } = this.state;
    return (
        <div>
        <h2>Signup</h2>
        
        <form onSubmit={this.handleSubmit}>
            <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.name} className="field__input a-field__input" name="name" placeholder="e.g. John Doe" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Full Name</span>
                        </span>
                        </label>   

            <label  className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.email} name="email" className="field__input a-field__input"  placeholder="e.g. myemail@gmail.com" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Email</span>
                        </span>
                        </label>

            <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.password} name="password" className="field__input a-field__input" type="password" placeholder="password" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Password</span>
                        </span>
                        </label><br/>

            <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.title}name="title" className="field__input a-field__input" placeholder="e.g. Sales Manager" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Title</span>
                        </span>
                        </label><br/>

        <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.company_id}name="company_id" className="field__input a-field__input" placeholder="e.g. Sales Manager" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Company ID</span>
                        </span>
                        </label><br/>

                        {/* <div className="field">
                            <label className="label">Upload image</label>
                            <div className="control">
                                <input className="input" type="file" name="file"  onChange={this.fileChange.bind(this)}/>
                            </div>
                        </div> */}
            {/* <button className="button is-link" onClick={this.handleClick}>Save</button> */}
          {/* </div> */}
            
        {/* <ReactFileReader fileTypes={[".jpg",".jpeg", ".png"]} base64={true} multipleFiles={true} handleFiles={this.handleFiles}>
        <button className='btn'>Upload</button>
        </ReactFileReader> */}



    <div>
            <input type="file" onChange={this.onSelectFile} />
            <button className="button is-link" onClick={this.handleClick} >Save</button>
            </div>
            {src && (
                <div id="previewDiv">
            <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                id="imgPreview"
            /></div>
            )}
            {croppedImageUrl && (
                console.log(croppedImageUrl), 
                console.log(this.state.src),
                // this.state.croppedImg.push(croppedImageUrl),
            <div id="babyImg"><img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} id="imgPrev" ref={this.blobToUrl} /></div>
            )}
            {/* <button className="button is-link" onClick={this.handleClick}>Save</button> */}
        
            



            <input className="signupbutton" type="submit" value="Signup"/>



        </form>

        {/* {this.renderPreviewImage()} */}

        </div>

        
        );
    }
}

export default withRouter(SignUp);