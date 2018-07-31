module.exports = {

    submit_application: (req, res, next) => {
        const {first_name, last_name, email, phone, city, us_state, zip_code, boat_name, boat_type, date, application_status, member_type} = req.body
        req.app.get('db').submit_application([first_name, last_name, email, city, us_state, zip_code, boat_name, boat_type, date, phone, application_status, member_type])
        .then( () => { 
            res.status(200).send('Application Submitted') 
            console.log('New Application Submission', req.body)
        })
        .catch(err => console.log('ERROR: Update Failed'));
    },

    get_all_docs: ( req, res, next ) => {
        req.app.get('db').get_all_docs()
          .then(docs => { res.status(200).send(docs) 
        });    
    },

    get_all_applications: ( req, res, next ) => {
        req.app.get('db').get_all_apps()
          .then(apps => { res.status(200).send(apps) 
        });    
    },

    post_document: (req, res, next) => {
        console.log(req.body)
        const {fileName, fileType, fileURL, fileIMG} = req.body
        req.app.get('db').post_document([fileName, fileType, fileURL, fileIMG])
        .then( () => { 
            res.status(200).send() 
            console.log('New Document Posted', req.body)
        })
        .catch(err => console.log(err, 'ERROR: Post Failed'));
    },

    post_picture: (req, res, next) => {
        const {pictureURL} = req.body
        const user_id = req.params.id
        req.app.get('db').post_picture([pictureURL, user_id])
        .then( () => { 
            res.status(200).send() 
            console.log('New Profile Picture Uploaded', req.body)
        })
        .catch(err => console.log(err, 'ERROR: Post Failed'));
    },

    get_user_profile_info: (req, res, next) => {
        const {id} = req.user;
        req.app.get('db').get_user_profile_info([id])
          .then(profile_info => { res.status(200).send(profile_info[0]) 
        }); 
    },

    get_user_photo: (req, res, next) => {
        const user_id = req.params.id
        req.app.get('db').get_user_photo([user_id])
          .then(profile_photo => { res.status(200).send(profile_photo) 
        }); 
    },

    checkUserSession: (req, res) => {
        res.status(200).send(req.session);
        console.log(req.session)
    },

    get_all_users: ( req, res, next ) => {
        req.app.get('db').get_all_users()
          .then(users => { res.status(200).send(users) 
        });    
    },

    get_member_profile: (req, res, next) => {
        const {id} = req.params;
        req.app.get('db').get_user_profile([id])
          .then(user_profile => { res.status(200).send(user_profile[0]) 
        }); 
    },

    get_member_profile_info: (req, res, next) => {
        const {id} = req.params;
        req.app.get('db').get_member_profile_info([id])
          .then(profile_info => { res.status(200).send(profile_info[0]) 
        }); 
    },

    create_profile: (req, res, next) => {      
        const { 
            status,
            email, 
            phone,
            city, 
            us_state, 
            boat_info, 
            about_me,
            club_position
        } = req.body;
        const {id} = req.user; 
        req.app.get('db').create_profile([
            id, 
            status,
            email, 
            phone,
            city, 
            us_state, 
            boat_info, 
            about_me,
            club_position
        ])
        .then( () => res.status(200).send() )
    },
    
    edit_profile: (req, res, next) => {      
        const { 
            status,
            email, 
            phone,
            city, 
            us_state, 
            boat_info, 
            about_me,
            club_position,
            boat_type,
            boat_length,
            boat_name
        } = req.body;
        const {id} = req.params; 
        req.app.get('db').edit_profile([
            id, 
            status,
            email, 
            phone,
            city, 
            us_state, 
            boat_info, 
            about_me,
            club_position,
            boat_type,
            boat_length,
            boat_name
        ])
        .then( () => res.status(200).send() )
    },
    
    delete_user: (req, res, next) => {
        const {id} = req.params;
        req.app.get('db').delete_user([id])
        .then( () => res.status(200).send('User deleted.')
        .catch(() => res.status(500).send()));
    },

    delete_doc: (req, res, next) => {
        const {id} = req.params;
        req.app.get('db').delete_doc([id])
        .then( () => res.status(200).send('Doc deleted.')
        .catch(() => res.status(500).send()));
    },

    update_payment: (req, res, next) => { 
        const {id} = req.params;  
        const boolval = true  
        console.log(id, boolval) 
        req.app.get('db').update_payment([id, boolval])
        .then( () => res.status(200).send() )
    },

    update_app_status: (req, res, next) => { 
        const {id} = req.params;  
        const newStatus = 'approved'
        console.log(id, newStatus)
        req.app.get('db').update_app_status([id, newStatus])
        .then( () => res.status(200).send() )
    },
};