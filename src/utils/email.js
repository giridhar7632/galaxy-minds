const { createTransport } = require('nodemailer')
const { emailTemplate } = require('./templates')
const { CLIENT_URL, EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD } = require('./config')

const createPasswordResetUrl = (id, token) => `${CLIENT_URL}/reset-password/${id}/${token}`

const createEmailVerificationUrl = (id, token) => `${CLIENT_URL}/verify-email/${id}/${token}`

const transporter = createTransport({
  service: EMAIL_HOST,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
})

const passwordResetTemplate = (user, url) => {
  const { username, email } = user
  return {
    from: `Galaxy Minds <noreply@talla_11915139@nitkkr.ac.in>`,
    to: email,
    subject: `Galaxy Minds - Password Reset Link`,
    html: emailTemplate({
      title: 'Password Reset Link',
      subject: 'Galaxy Minds - Password Reset Link',
      body: `Hey ${username}!
			Reset your password by clicking on the button below.`,
      link: url,
      btn: 'Reset Password',
      footer: `The link will expire in 15 mins!
		If you haven't requested password reset, please ignore!
		`,
    }),
  }
}

const emailVerificationTemplate = (user, url) => {
  const { username, email } = user
  return {
    from: `Galaxy Minds <noreply@talla_11915139@nitkkr.ac.in>`,
    to: email,
    subject: `Verify your email! ${username}`,
    html: emailTemplate({
      title: 'Email Verification Link',
      subject: 'Galaxy Minds - Email Verification Link',
      body: `Hey ${username}!
			Verify your email by clicking the button below.`,
      link: url,
      btn: 'Verify',
      footer: `If you haven't created an account, please ignore!
		`,
    }),
  }
}

const passwordResetConfirmationTemplate = (user) => {
  const { username, email } = user

  return {
    from: `Galaxy Minds <noreply@talla_11915139@nitkkr.ac.in>`,
    to: email,
    subject: `Galaxy Minds - Password Reset Successful`,
    html: emailTemplate({
      title: 'Password Reset Successful',
      subject: 'Galaxy Minds - Password Reset Successful',
      body: `Hey ${username}!
			You have successfully completed resetting your password.`,
      footer: `If you haven't changed your password, please reset it by clicking forgot password!
		`,
    }),
  }
}

const emailVerifyConfirmationTemplate = (user) => {
  const { username, email } = user

  return {
    from: `Galaxy Minds <noreply@talla_11915139@nitkkr.ac.in>`,
    to: email,
    subject: `Galaxy Minds - Email Verification Successful`,
    html: emailTemplate({
      title: 'Email Verification Successful',
      subject: 'Galaxy Minds - Email Verification Successful',
      body: `Hey ${username}!
			Your email address has been successfully verified. Thank you for signing up for Galaxy Minds. We look forward to helping you study and collaborate easily.`,
      footer: `If you are not expecting this email, please ignore!
		`,
    }),
  }
}

module.exports = {
  transporter,
  createPasswordResetUrl,
  createEmailVerificationUrl,
  passwordResetTemplate,
  emailVerificationTemplate,
  passwordResetConfirmationTemplate,
  emailVerifyConfirmationTemplate,
}
