import nodemailer from "nodemailer";

export const accountVerificationEmail = async (obj) => {
  const { email, fName, link } = obj;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Ecomm Technotronix " <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: `Account Verification Required`, // Subject line
    text: `Hello ${fName}, please follow the link to verify the account. ${link}`, // plain text body
    html: `
        <p>
            Hello ${fName},
        </p>
        <p>
            Please follow the link below to activate your account.
        </p>
        <p>
           <a href=${link}>${link}<a/>,
        </p>
        <p>
            Regards,<br />
            Ecomm Technotronix<br />
            Customer Support Team
        </p>
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
