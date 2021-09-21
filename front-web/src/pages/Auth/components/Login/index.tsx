import MainButton from 'core/components/MainButton'
import { makeLogin, storageSessionData } from 'core/utils/requests'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import AuthCard from '../Card'
import './style.scss'


type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const {register, handleSubmit} = useForm<FormData>()
    const [hasError, setHasError] = useState(false)
    const history = useHistory()

    const onSubmit = (data: FormData) => {
        makeLogin(data)
        .then(r => {
            setHasError(false)
            storageSessionData(r.data)
            history.push('/admin')
        })
        .catch(() => setHasError(true))
    }


    return (<AuthCard title="Login">
        {hasError && (
                <div className="alert alert-danger mt-5">Usuário ou senha inválido</div>
            )}
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input 
            className="form-control input-base margin-bottom-30"
            type="email" 
            {...register('username',{required: true})}
            placeholder="Email"
            />

            <input 
            className="form-control input-base"
            {...register('password',{required: true})}
            type="password" 
            placeholder="Senha"
            />

            <Link to="/admin/auth/recover" className="login-link-recover">
                Esqueci a senha?
            </Link>
            <div className="login-submit">
                <MainButton texto="Logar" />
            </div>
            <div className="text-center">
                <span className="not-registered">Não tem Cadastro?</span>
                <Link to="/admin/auth/register" className="login-link-register">
                    CADASTRAR
                </Link>
            </div>
        </form>

    </AuthCard>)
}

export default Login