const notesCtrl = {};

const Note = require('../models/Note') //Traigo los modelos para poder trabajar datos



//CREATE/////////////
notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body; //Almaceno los datos recibidos por post  
  const newNote = new Note({ title, description }); //Crea un nueva nueva nota
  newNote.user = req.user.id //Almaceno el id del usuario que creo la nota
  await newNote.save();//Almacena en la BBDD
  
  req.flash('success_msg', 'Nueva nota añadida');
  res.redirect('/notes')
};


//LIST NOTES///////////
notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).lean();
  res.render('notes/all-notes', { notes });
};



//UPDATE////////////////
notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash('error_msg', 'Nice try...')
    return res.redirect('/notes');
  }
  res.render('notes/edit-note', { note });
};
notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description }).lean();
  req.flash('success_msg', 'Nota modificada');
  res.redirect('/notes')
};



//DELETE////////////
notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Nota eliminada');
  res.redirect('/notes')
};


module.exports = notesCtrl;