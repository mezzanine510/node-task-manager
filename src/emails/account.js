const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mezzanine510@gmail.com',
        subject: 'Welcome to the app!',
        text: `Welcome to the app, ${ name }! Let me know how you get along with the app.`
    });
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mezzanine510@gmail.com',
        subject: 'Sorry to see you go!',
        text: `We're sorry to see you go, ${ name }! Let me know if there's anything I can do to keep you around, and thanks for the time spent using our app!`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}