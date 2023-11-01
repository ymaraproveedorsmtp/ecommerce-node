const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const transporter = require("./mailer");
const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
/* mercadopago.configure({
  access_token: "TEST-4442808000040166-100516-146b96c9aff3ae612236b870ce443481-223347994",
}); */

mercadopago.configure({
  access_token: "TEST-4442808000040166-100516-146b96c9aff3ae612236b870ce443481-223347994",
});

//const client = new MercadoPagoConfig({ accessToken: 'TEST-4442808000040166-100516-146b96c9aff3ae612236b870ce443481-223347994' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../tiendaLAzyLoading")));
app.use(cors());

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "tiendaLAzyLoading/src/app/minorista/finalizar-compra", "finalizar-compra.component.html");
  res.sendFile(filePath);
});

app.post("/create_preference", (req, res) => {
 
  let preference = {
    items: [
      {        
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:8081",
      failure: "http://localhost:8081",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.listen(8081, () => {
  console.log("The server is now running on Port 8081");
});






app.post("/enviarMail", function (req, res) {
  let items = []; 
  let items2 = [];
  for (var i = 0; i < req.body.nombre.length; i++) {
   items = "Nombre: " + req.body.nombre[i] + " </br> " + "Categoria: " + req.body.marca[i] + " </br> " + "Precio: " + req.body.precio[i] + " </br> " + 
   "Cantidad: " + req.body.cantidadEnCarro[i] + " </br> " + "<hr>"
    items2.push(items)
  };
  console.log(req.body.nombre.length)
  console.log(items2)
 // console.log(req.body)
  let mailOptions = {
    from: "pufytospetshop@gmail.com",
    to: "adriancasanova_@outlook.es",
    subject: 'Se ha realizado una compra',
    text: 'Por favor verifique que la compra haya sido pagada antes de realizar el envío: ',
    
    html:` 
    <div> 
    <h4>Por favor verifique que la compra haya sido pagada antes de realizar el envío: </h4>
    <h4>Datos de envio: </h4>
    </div>  
    
    <div> 
    <hr> 
    </div>  ` 
    + (req.body.telefono + ' </br> '
     + req.body.email + ' </br> '
    + req.body.nombreCliente + ' </br> '
     + req.body.apellido + ' </br> '
     + req.body.dni + ' </br> '
     + req.body.provincia + ' </br> '
      + req.body.localidad + ' </br> '
     + req.body.cp + ' </br> '
       + req.body.direccion + ' </br> '
     + req.body.departamento + ' </br> '
    + req.body.piso + ' </br> '
     + req.body.observaciones) + ' </br> ' +
     "<hr> "
   +  `   <h4> Detalles de la compra: </h4> ` 
     + (  
      items2 
   
       ) 

  }; 
transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
  }
}); 
}); 