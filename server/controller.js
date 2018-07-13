module.exports = {

    submit_application: (req, res, next) => {
        const  {first_name, last_name, email, city, us_state, zip_code, boat_name, boat_type, date} = req.body
        req.app.get('db').submit_application([first_name, last_name, email, city, us_state, zip_code, boat_name, boat_type, date])
        .then( () => { 
            res.status(200).send('Application Submitted') 
            console.log('New Application Submission', req.body)
        }) 
        .catch(err => console.log('ERROR: Update Failed'));
    },

    get_user_profile_info: (req, res, next) => {
        const {id} = req.user;
        req.app.get('db').get_user_profile_info([id])
          .then(profile_info => { res.status(200).send(profile_info[0]) 
        }); 
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
            club_position
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
            club_position
        ])
        .then( () => res.status(200).send() )
    },
    
    delete_user: (req, res, next) => {
        const {id} = req.params;
        
        req.app.get('db').delete_user([id])
        .then( () => res.status(200).send('User deleted.')
        .catch(() => res.status(500).send()));
    }

};