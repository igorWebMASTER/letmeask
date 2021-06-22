import { useHistory } from 'react-router'

import { firebase, auth } from '../services/firebase'

import IlustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import googleIcon from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'

export function Home(){
    const history = useHistory();

    function signIn(){

    }

    function handleCreateRoom(){
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).then(result=> {
            console.log(result)

            history.push('/rooms/new')

        })

    }

    return (
       <div id="page-auth">
           <aside>
               <img src={IlustrationImg} alt="image" />
               <strong>Crie salas de Q&amp;A ao-vivo</strong>
               <p>Tire suas dúvidas da sua audiência em tempo-real</p>
           </aside>
           <main>
               <div className="main-content">
                <img src={logoImg} alt="Letmeask" />
                <button onClick={handleCreateRoom} className="create-room">
                    <img src={googleIcon} alt="Logo do google" />
                    Crie sua sala com o Google
                </button>
               <div className="separator">
                   ou entre em uma sala
               </div>
               <form action="">
                   <input type="text" name="" placeholder="Digite uma sala" id="" />
                   <Button type="submit">
                        Entrar na sala 
                   </Button>
               </form>
               </div>
           </main>
       </div> 
    )
}