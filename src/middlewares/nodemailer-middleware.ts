import {encrypt, decrypt} from './utils';

/*import * as Nodemailer from 'nodemailer';

const transporter = Nodemailer.createTransport({
    host: 'mail.gmx.net',
    port: 465,
    secure: false,
    debug:true,
    auth:{
        user:'bopdidus@gmx.de',
        pass:'12345@Brice'
    }
});

export const sendEmail = (receiver, object, content) =>{
        
    let options = {
         from:"bopdidus@gmx.de",
         to:receiver,
         subject: object,
         text:text_encrypted
     };
    
     transporter.sendMail(options, function(err, info){
        if(err){
            console.log(err);
        }
        console.log("sent: ", info);
     });
}*/

const mailjet = require ('node-mailjet')
.connect('0229623b1e9c512e1754ecfb6eae6ab6', '18aa7e647c6ae35e968d0addc1079b1f')

export const sendEmail = (receiver, object, content)=>{
    let text_encrypted = encrypt(content);
    console.log(text_encrypted,"encryption")
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "bopdidus@gmx.de",
            "Name": "Lost Valley"
          },
          "To": [
            {
              "Email": receiver,
              "Name": "Lost Valley"
            }
          ],
          "Subject": object,
          "TextPart": content,
          "HTMLPart": `<h3>Dear customer, welcome to <a href='http://localhost:3000/user/activation/${text_encrypted}'>Activation</a>!</h3><br />May the delivery force be with you!`,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
    
}

