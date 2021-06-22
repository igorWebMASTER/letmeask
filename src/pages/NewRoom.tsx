import { Link } from 'react-router-dom'

import IlustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'


import { Button } from '../components/Button'

import '../styles/auth.scss'

export function NewRoom(){
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
                
               <form>
                   <h2>Criar uma nova sala</h2>
                   
                   <input type="text" name="" placeholder="Nome da sala" id="" />
                   <Button type="submit">
                        Criar a sala 
                   </Button>
               </form>
               <p>
                   Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
               </p>
               </div>
           </main>
       </div> 
    )
}