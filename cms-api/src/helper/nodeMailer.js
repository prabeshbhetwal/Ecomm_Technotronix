import nodemailer from "nodemailer";

export const accountVerificationEmail = async ({ email, fName, link }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `Fred Foo 👻 <${process.env.SMTP_HOST}>`, // sender address
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
        <br />        <br />        <br />
        <p>
           <a href=${link}>${link}<a/>,
        </p>
        <br />        <br />        <br />
        <p>
            Regards,<br />
            Ecomm Technotronix,<br />
            Customer Support Team
        </p>
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
