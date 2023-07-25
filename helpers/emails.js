import nodemailer from 'nodemailer'

export const emailRegistro = async(datos) => {

   const { nombre, email, token } = datos;

   const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD
      }
   });

   // console.log(`${process.env.FRONTEND_URL}/confirmar/${token}`)

   // informacion del email
   const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
      to: email,
      subject: "UpTask - Comprueba tu cuenta",
      text: "Comprueba tu cuenta en UpTask",
      html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
      <p>Tu cuenta ya es esta casi lista, solo debes comprobarla en el siguiente enlace:</p>

      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

      <p>Si tu no creaste tu cuenta, puedes ignorar este correo.</p>

      `,
   })
}