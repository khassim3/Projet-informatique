const express = require('express'); //importer express dans le fichier

const app = express(); //permet de creer une application express
const cors = require('cors')
app.use(express.json());
app.use(cors());
const bcrypt = require("bcrypt");

const Users = require('./models/Users');
const MentorCategory = require('./models/MentorCategories');
const Category = require('./models/Categories');
const Mentorship = require('./models/Mentorships');
const Message = require('./models/Messages');
const Session = require('./models/Sessions');
const Profile = require('./models/Profiles');
const Thing = require('./models/thing');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://khassimndao2:Fatoudioum@cluster0.9srhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.error('Connexion à MongoDB échouée !', err));

// Vérification de l'état de la connexion avec mongoose.connection
const db = mongoose.connection;

// Événement "connected" : lorsque la connexion est établie
db.on('connected', () => {
    console.log('Mongoose est connecté à la base de données.');
});

// Événement "error" : en cas d'erreur de connexion
db.on('error', (err) => {
    console.error('Erreur de connexion Mongoose :', err);
});

// Événement "disconnected" : lorsque la connexion est perdue
db.on('disconnected', () => {
    console.log('Mongoose a été déconnecté de la base de données.');
});

// Optionnel : Fermeture propre lorsque l'application se termine
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Connexion Mongoose fermée proprement.');
    process.exit(0);
});

  
app.use(express.json()) //intercepte toutes les requetes qui ont un content-type


app.use((req, res, next) => {  //pour que tout le monde ait acces a l'API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

  app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.post('/api/users/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis" });
      }
  
      const user = await Users.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "Email introuvable" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }
  
      res.status(200).json({ message: "Connexion réussie", user });
  
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  


app.post('/api/users', async (req, res) => {
  try {
    delete req.body._id;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new Users({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "Utilisateur enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get('/api/users/:id', (req, res, next) => {
  Users.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/users', (req, res, next) => {
  Users.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/users/:id', (req, res, next) => {
  Users.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/users/:id', (req, res, next) => {
  Users.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});

app.post('/api/users/check-email', async (req, res) => {
  try {
      const { email } = req.body;
      
      if (!email) {
          return res.status(400).json({ message: "L'email est requis" });
      }

      // Vérifier si l'email existe dans la base de données
      const existingUser = await Users.findOne({ email });

      if (existingUser) {
          return res.json({ exists: true });
      }

      res.json({ exists: false });

  } catch (error) {
      console.error("Erreur lors de la vérification de l'email :", error);
      res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post('/api/mentorcategories', (req, res, next) => {
  delete req.body._id;
  const mentorcategorie = new MentorCategory({
    ...req.body
  });
  mentorcategorie.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/mentorcategories/:id', (req, res, next) => {
  MentorCategory.findOne({ _id: req.params.id })
    .then(mentorcategorie => res.status(200).json(mentorcategorie))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/mentorcategories', (req, res, next) => {
  MentorCategory.find()
    .then(mentorcategories => res.status(200).json(mentorcategories))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/mentorcategories/:id', (req, res, next) => {
  MentorCategory.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/mentorcategories/:id', (req, res, next) => {
  MentorCategory.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});



app.post('/api/categories', (req, res, next) => {
  delete req.body._id;
  const categorie = new Category({
    ...req.body
  });
  categorie.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/categories/:id', (req, res, next) => {
 Category.findOne({ _id: req.params.id })
    .then(categorie => res.status(200).json(categorie))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/categories', (req, res, next) => {
  Category.find()
    .then(categories => res.status(200).json(categories))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/categories/:id', (req, res, next) => {
  Category.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/categories/:id', (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});



app.post('/api/mentorships', (req, res, next) => {
  delete req.body._id;
  const mentorship = new Mentorship({
    ...req.body
  });
  mentorship.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/mentorships/:id', (req, res, next) => {
  Mentorship.findOne({ _id: req.params.id })
    .then(mentorship => res.status(200).json(mentorship))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/mentorships', (req, res, next) => {
  Mentorship.find()
    .then(mentorships => res.status(200).json(mentorships))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/mentorships/:id', (req, res, next) => {
    Mentorship.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/mentorships/:id', (req, res, next) => {
  Mentorship.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});



app.post('/api/messages', (req, res, next) => {
  delete req.body._id;
  const message = new Message({
    ...req.body
  });
  message.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/messages/:id', (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/messages', (req, res, next) => {
  Message.find()
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/messages/:id', (req, res, next) => {
  Message.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/messages/:id', (req, res, next) => {
  Message.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});



app.post('/api/profiles', (req, res, next) => {
  delete req.body._id;
  const profile = new Profile({
    ...req.body
  });
  profile.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/profiles/:id', (req, res, next) => {
  Profile.findOne({ _id: req.params.id })
    .then(profile => res.status(200).json(profile))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/profiles', (req, res, next) => {
  Profile.find()
    .then(profiles => res.status(200).json(profiles))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/profiles/:id', (req, res, next) => {
  Profile.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/profiles/:id', (req, res, next) => {
  Profile.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});



app.post('/api/sessions', (req, res, next) => {
  delete req.body._id;
  const session = new Session({
    ...req.body
  });
  session.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sessions/:id', (req, res, next) => {
  Session.findOne({ _id: req.params.id })
    .then(session => res.status(200).json(session))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/sessions', (req, res, next) => {
  Session.find()
    .then(sessions => res.status(200).json(sessions))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/sessions/:id', (req, res, next) => {
  Session.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/sessions/:id', (req, res, next) => {
  Session.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});






module.exports = app; // on exporte l'application pour qu'elle soit accessible depuis les autres fichiers