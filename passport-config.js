const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')
const bcrypt = require('bcrypt')



function initialize(passport, getUserByName, getUserById) {
  const authenticateUser = async (name, password, done) => {
    const user = getUserByName(name)
    if (user == null) {
      return done(null, false, { message: 'No user with that name' })
    }

    try {
      if (await (password === user.password, done)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password is incorrect' })
      }
    } catch (e) {
      return done(e)
    }

    passport.use('local', new LocalStrategy(authenticateUser))
    passport.serializeUser(user.serializeUser());
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
  }
  
}

module.exports = initialize


/*
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  name => admin.find(user => {"username"}, name),
  id => admin.find(user => user.id === id)
)
*/