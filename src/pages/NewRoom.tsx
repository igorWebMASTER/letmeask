import { useContext } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import IlustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'


import { Button } from '../components/Button'
import { AuthContext } from '../contexts/AuthContext'
import { database } from '../services/firebase'

import '../styles/auth.scss'

export function NewRoom(){
    const { user} = useContext(AuthContext);

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(e:FormEvent){
        e.preventDefault();


        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
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
                    <form onSubmit={handleCreateRoom}>
                        <h2>Criar uma nova sala</h2>
                        <input 
                            type="text" 
                            name="" 
                            placeholder="Nome da sala" 
                            onChange={e => setNewRoom(e.target.value)}
                            value={newRoom}
                        />
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