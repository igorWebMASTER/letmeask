import { useHistory, useParams } from 'react-router-dom'
import React, { FormEvent } from 'react'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'


import LogoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'


import '../styles/room.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import toast from 'react-hot-toast'

import { Question as QuestionComponent } from '../components/Question'
import { useRoom } from '../hooks/useRoom'





type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId)


    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })


        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Você tem certeza que você deseja excluir esta perguntar')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room" >
            <header>
                <div className="content">
                    <img src={LogoImg} alt="letmeask" />

                    <div>
                        <RoomCode code={params.id} />
                        <Button
                            isOutlined
                            onClick={handleEndRoom}

                        >
                            Encerrar sala
                        </Button>
                    </div>
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

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <QuestionComponent
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="remove pergunta" />
                                </button>
                            </QuestionComponent>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
