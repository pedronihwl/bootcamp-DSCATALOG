import MainButton from 'core/components/MainButton'
import { makeLogin, storageSessionData } from 'core/utils/requests'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory, useLocation } from 'react-router-dom'
import AuthCard from '../Card'
import './style.scss'


type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {
    const {register, handleSubmit, formState: {errors} } = useForm<FormData>()
    const [hasError, setHasError] = useState(false)
    const history = useHistory()
    const location = useLocation<LocationState>()

    const { from } = location.state || { from: { pathname: '/admin'} }

    const onSubmit = (data: FormData) => {
        makeLogin(data)
        .then(r => {
            setHasError(false)
            storageSessionData(r.data)
            // .push -> empilha rotas
            // .replace -> troca o topo da pilha por outro dado
            history.replace(from)
        })
        .catch(() => setHasError(true))
    }


    return (<AuthCard title="Login">
        {hasError && (
                <div className="alert alert-danger mt-5">Usuário ou senha inválido</div>
            )}
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="margin-bottom-30">
            <input 
            className={`form-control input-base ${errors.username ? 'is-invalid':''}`}
            type="email" 
            {...register('username',{required: "Email obrigatório", pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
            }})}
            placeholder="Email"
            />
            {errors.username && (
                <div className="invalid-feedback d-block">
                    {errors.username.message}
                </div>
            )}
            </div>

            <div >
            <input 
            className={`form-control input-base ${errors.password ? 'is-invalid':''}`}
            {...register('password',{required: true})}
            type="password" 
            placeholder="Senha"
            />
            {errors.password && (
                <div className="invalid-feedback d-block">
                    Campo obrigatório
                </div>
            )}
            </div>

            <Link to="/auth/recover" className="login-link-recover">
                Esqueci a senha?
            </Link>
            <div className="login-submit">
                <MainButton texto="Logar" />
            </div>
            <div className="text-center">
                <span className="not-registered">Não tem Cadastro?</span>
                <Link to="/auth/register" className="login-link-register">
                    CADASTRAR
                </Link>
            </div>
        </form>

    </AuthCard>)
}

export default Login