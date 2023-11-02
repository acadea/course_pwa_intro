import express from "express";
import { usePrisma } from "./services/prisma";


const PORT = process.env.PORT || 3001;


const app = express();


app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/api/ping', (req, res) => {
  res.end();
})

// get notes
app.get('/api/notes', (req, res) => {
  const client = usePrisma();

  client.note.findMany()
    .then((notes) => {
      res.json(notes);
    })

});
// get a single note
app.get('/api/notes/:id', (req, res) => {
  const client = usePrisma();

  client.note.findUnique({
    where: {
      id: Number(req.params.id),
    }
  }).then(note => res.json(note));

});
// create note
app.post('/api/notes', (req, res) => {
  const client = usePrisma();

  client.note.create({
    data: {
      body: req.body.body,
      title: req.body.title,
    }
  }).then((created) => {
    res.json(created);
  })

});

// update note
app.patch('/api/notes/:id', (req, res) => {

  const client = usePrisma();

  function valueIf(field: any){
    return Object.values(field)[0] ? field : {};
  }

  client.note.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      // title: req.body.title, // DONT DO THIS
      ...valueIf({title: req.body.title}),
      ...valueIf({body: req.body.body}),
    }
  }).then(updated => {
    res.json(updated);
  })

});

// delete note
app.delete('/api/notes/:id', (req, res) => {
  const client = usePrisma();

  client.note.delete({
    where: {
      id: Number(req.params.id)
    }
  }).then(result => res.json({data: 'ok'}));
});

app.listen(PORT, () => {
  console.log('app is running on http://localhost:' + PORT);
})