'use strict';
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
exports.login1 = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render('login1', {
        message: 'Plz Provide email and password',
      });
    }
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (error, results) => {
        console.log(results);
        if (error) {
          console.log(error);
        }
        if (results.length === 0) {
          return res.status(401).render('login1', {
            message: 'YOU ARE NOT REGISTERED PLEASE REGISTER AND THEN LOGIN IN',
          });
        }
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          return res
            .status(401)
            .render('login1', { message: 'EMAIL OR PASSWORD IS INCORRECT😎' });
        } else {
          const id = results[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log('The token is :' + token);
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie('jwt', token, cookieOptions);
          return res.status(200).redirect('/services');
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
exports.register1 = (req, res) => {
  console.log(req.body);
  const { username, email, password, passwordConfirm } = req.body;
  if (!username || !email || !password || !passwordConfirm) {
    return res.render('register1', {
      message: '🎇Fill the details properly🎇',
    });
  } else {
    db.query(
      'SELECT email FROM users WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.log(error);
        }

        if (results.length > 0) {
          return res.render('register1', {
            message: 'That email has been taken or in use !!!🤔',
          });
        } else if (password !== passwordConfirm) {
          return res.render('register1', {
            message: 'password do not match🤔',
          });
        }

        let hasedPassword = await bcrypt.hash(password, 8);
        console.log(hasedPassword);

        db.query(
          'INSERT INTO users SET ?',
          { username: username, email: email, password: hasedPassword },
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              console.log(results);

              return res.render('register1', {
                message: 'User Registered',
              });
            }
          }
        );
      }
    );
  }
};
