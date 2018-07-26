const ctrl = require('./controller');
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const passport = require ('passport');
const Auth0Strategy = require ('passport-auth0');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  ADMIN_EMAIL,
  ADMIN_EMAIL_PASS,
} = process.env;

// _______________________________________________________________________________________

app.use( bodyParser.json() );
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// _____NODEMAILER________________________________________________________________________

let transport_object = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: ADMIN_EMAIL,
      pass: ADMIN_EMAIL_PASS
    }
}
  
let transporter = nodemailer.createTransport(transport_object)

app.post('/api/email_admin', (req, res, next) => {
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var applicant_email = req.body.email
    var content = `You have a new application submission from ${first_name} ${last_name} (EMAIL: ${applicant_email}).`
    var mail = {
      from: 'OYC Application System',
      to: ADMIN_EMAIL,
      subject: `New Application Submission from ${last_name}, ${first_name}.`,
      text: content
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
            } else {
            res.json({
                msg: 'success'
            })
        }
    })
})

app.post('/api/email_applicant', (req, res, next) => {
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var applicant_email = req.body.email
    var content = `To ${first_name} ${last_name}, Thank you for your application to the Outrigger Yacht Club. We will review your application and contact you. Sincerely, Outrigger Yacht Club.`
    var mail = {
      from: ADMIN_EMAIL,
      to: applicant_email,
      subject: 'APPLICATION RECEIVED: Thank you for your application to the OYC',
      text: content
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
})

// ___AUTHENTICATION_PROTOCOLS______________________________________________________

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    console.log(profile)
    const db = app.get('db');
    db.find_user([profile.id]).then(userResult => {
        if (!userResult[0]) {
            db.create_user([
                profile.displayName,
                profile.id,
                profile.picture
            ]).then(createdUser => {
                return done(null, createdUser[0].id)
            })
        } else {
            return done(null, userResult[0].id)
        }
    })
}))
passport.serializeUser((id, done) => {
    done(null, id)
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then(loggedInUser => {
        done(null, loggedInUser[0]);
    })
})

// ___AUTHENTICATION_ENDPOINTS______________________________________________________
    
app.get('/api/user_session', ctrl.checkUserSession);
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/profile',
    failureRedirect: 'http://localhost:3000'
}));
app.get('/auth/me', function(req,res) {
    if(req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('ATTENTION: Unauthorized User');
    }
});

// ___ENDPOINTS______________________________________________________

app.get('/api/user_profile_info', ctrl.get_user_profile_info);
app.get('/api/member_list', ctrl.get_all_users);
app.get('/api/member_profile/:id', ctrl.get_member_profile);
app.get('/api/member_profile_info/:id', ctrl.get_member_profile_info);
app.get('/api/docs', ctrl.get_all_docs);
app.delete('/api/delete_doc/:id', ctrl.delete_doc);
app.get('/api/applications', ctrl.get_all_applications);
app.post('/api/create_profile', ctrl.create_profile);
app.post('/api/submit_application', ctrl.submit_application);
app.post('/api/post/docs', ctrl.post_document);
app.put('/api/edit_profile/:id', ctrl.edit_profile);
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/');
});
app.delete('/api/delete_user', ctrl.delete_user);

// ___PORT_&_DB_CONNECTION____________________________________________________

massive(CONNECTION_STRING).then( db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => console.log(`Ship docked on port: ${SERVER_PORT}`))
});