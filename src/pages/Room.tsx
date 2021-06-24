import { useParams } from 'react-router-dom'
import React, { FormEvent } from 'react'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'


import LogoImg from '../assets/images/logo.svg'

import '../styles/room.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { useEffect } from 'react'



type FirebaseQuestions = Record<string, {
    author: {
        name:string;
        avatar: string;
    }
    content: string;
    isAnswered:boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name:string;
        avatar: string;
    }
    content: string;
    isAnswered:boolean;
    isHighlighted: boolean;
}

type RoomParams = {
    id: string;
}

export  function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions]  = useState<Question[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
           const databaseRoom = room.val();
           const firebaseQuestions : FirebaseQuestions =  databaseRoom.questions ?? {}

           const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
             return {
                 id: key,
                 content: value.content,
                 author: value.author,
                 isHighlighted: value.isHighlighted,
                 isAnswered: value.isAnswered
             }
           })
           setTitle(databaseRoom.title)
           setQuestions(parsedQuestions)
        })
    }, [roomId])

    async function handleSendQuestion(e :FormEvent){
        e.preventDefault()

        if(newQuestion.trim() === '') return;
    
        if(!user){
            throw new Error('You must be logged id')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')

    }

    return (
        <div id="page-room" >
            <header>
                <div className="content">
                    <img src={LogoImg} alt="letmeask" />

                    <RoomCode code={params.id}/>
                </div>
            </header>

            <main className='content'>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (
                        <span>
                           <span>{questions.length}</span> 
                            pergunta(s)
                        </span>
                    )}
                </div>

                <form onSubmit={handleSendQuestion} >
                    <textarea 
                        placeholder="O que você quer perguntar" 
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt="avatar" />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, 
                                <button>faça o seu login.</button>
                            </span>
                        ) }

                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                    {JSON.stringify(questions)}

                </form>
            </main>
        </div>
    )
}
