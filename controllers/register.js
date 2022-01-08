const handleRegister = (req,res,db,bcrypt) => {
    const {email,password,name}=req.body;
    if(!email || !password || !name) {
        return res.status(400).json("Could not register!");
    }
    const hash=bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name:name,
                email:email,
                joined: new Date()
            })
            .then(user=> {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleRegister:handleRegister
}