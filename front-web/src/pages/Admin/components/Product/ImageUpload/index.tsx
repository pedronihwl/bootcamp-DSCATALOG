import './style.scss'
import { ReactComponent as UploadPlaceholder } from 'core/assets/images/upload-placeholder.svg' 
import { makePrivateRequest } from 'core/utils/requests'
import { useState } from 'react'
import { toast } from 'react-toastify'


type Props = {
    onUploadSuccess: (img: string) => void;
    productImage?: string;
}
const ImageUpload = ({ onUploadSuccess, productImage } : Props) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImg, setUploadedImg] = useState('');

    const priorityImg = uploadedImg || productImage

    // ProgressEvent pertence ao javascript e captura o progresso de envio de um requisição
    // onUploadProgress é um atributo do axios que trata o progresso de envio
    const onUploadProgress = (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setUploadProgress(progress)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0]

        if(selected){
            const payload = new FormData();
            payload.append('file',selected)

            makePrivateRequest({ 
                url: '/products/image',
                method: 'POST',
                data: payload,
                onUploadProgress
            }).then(r => {
                setUploadedImg(r.data.uri)
                onUploadSuccess(r.data.uri)
            }).catch(() => toast.error('Erro ao enviar arquivo')).finally(() => setUploadProgress(0))
        }

    }

    return <div className="row">
        <div className="col-6">
            <div className="upload-image-button">
                <input id="upload" type="file"  accept="image/jpg, image/png" hidden onChange={handleChange}/>
                <label htmlFor="upload">ADICIONAR IMAGEM</label>
            </div>
            <small className="upload-image-helper text-primary">
                A imagem deve ser  JPG ou PNG e não deve ultrapassar <b>5 mb</b>.
            </small>
        </div>
        <div className="col-6 upload-container">
            { uploadProgress > 0 && (
                <>
                <UploadPlaceholder/>
                <div className="upload-bar-container">
                    <div className="upload-bar-progress" style={{width: `${uploadProgress}%`}}></div>
                </div>
                </>
            )}

            {(priorityImg && uploadProgress === 0) && <img src={priorityImg} alt={priorityImg} className="uploaded-image" />}

        </div>

    </div>


}

export default ImageUpload;