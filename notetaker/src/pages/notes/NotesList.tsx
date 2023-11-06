import React, { useEffect, useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import { Button, List, ThemeIcon } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { IconNotes } from '@tabler/icons-react';
import {INote} from '../../types/note';

export default function NotesList() {

  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  function getNotes(){
    console.log('getting notes');
    return fetch('/api/notes', {
      headers: {
        'accept': 'application/json'
      },
      method: 'GET'
    }).then((res) => res.json());
  }

  useEffect(() => {
    getNotes().then((notes) => setNotes(notes));
  }, []);

  function createNote(){
    fetch('/api/notes', {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
      body: '{}',
    })
    .then(res => res.json())
    .then((res) => navigate('/notes/' + res.id));
  }

  return (
    <AppLayout>
      <List 
        spacing="xs"
        size='sm'
        center
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconNotes size="1rem" />
          </ThemeIcon>
        }
      >
        <Button onClick={createNote} mb="16px" >New note</Button>

        {notes.map((note: INote) => (
          <List.Item key={note.id}>
            <Link to={'/notes/' + note.id}>{note.title} ({note.id}) </Link>
          </List.Item>
        ))}
      </List>
    </AppLayout>
  )
}
