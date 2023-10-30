import React, { SyntheticEvent, useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import { ActionIcon, Button, Grid, GridCol, Space, TextInput } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useLoaderData, Link as RouterLink, useNavigate } from 'react-router-dom';
import { INote } from '../../types/note';
import { useDebouncedState } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons-react';

export default function SingleNote() {

  const note: INote|any = useLoaderData();
  const [content, setContent] = useDebouncedState(note.body, 1500);
  const [title, setTitle] = useDebouncedState(note.title, 1500);
  const navigate = useNavigate();


  function updateNote(titleInput: string|null = null, bodyInput: string|null = null){

    fetch('/api/notes/' + note.id, {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: titleInput || title,
        body: bodyInput || content,
      })
    })
  }

  function onChange(e: SyntheticEvent){
    setTitle(function(){
      const inputVal = (e.target as HTMLInputElement).value;
      updateNote(inputVal);
      return inputVal;
    })
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
    ],
    content,
    onUpdate({editor, transaction}){
      const html = editor.getHTML();

      setContent(function(){
        updateNote(null, html);
        return html;
      })

    }
  });

  function deleteNote(){
    fetch('/api/notes/' + note.id, {
      method: 'DELETE'
    }).then(() => navigate('/notes'));
  }


  return (
    <AppLayout>

      <Grid>
        <GridCol span={1}>
          <RouterLink to="/notes">
            <ActionIcon variant='subtle'>
              <IconArrowLeft stroke={1.5} ></IconArrowLeft>
            </ActionIcon>
          </RouterLink>

        </GridCol>

        <GridCol span={2} offset={9}>
          <Button onClick={deleteNote} w={100}>Delete</Button>
        </GridCol>

      </Grid>


      <TextInput
        label="Title"
        onChange={onChange}
        defaultValue={title}
      />

      <Space h="md"></Space>


      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

    </AppLayout>
  )
}
