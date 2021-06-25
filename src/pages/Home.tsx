/* eslint-disable jsx-a11y/img-redundant-alt */
import { useHistory } from 'react-router'


import IlustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import googleIcon from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home() {
    const history = useHistory()
    const { signInWithGoogle, user } = useAuth()
    const [roomCode, setRoomCode] = useState('')


    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
    }


    async function handleJoinRoom(e: FormEvent) {
        e.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        console.log(roomRef)

        if (!roomRef.exists()) {
            alert('Rooms doesn not exists')
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Sala já fechada.')
            return;
        }


        history.push(`/rooms/${roomCode}`)
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
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text" name=""
                            placeholder="Digite uma sala"
                            id=""
                            onChange={e => setRoomCode(e.target.value)}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}