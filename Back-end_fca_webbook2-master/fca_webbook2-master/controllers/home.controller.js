const fs = require("fs");
const Handlebars = require("handlebars");

exports.get = (req, res) => {

    let home = fs.readFileSync(__dirname + "/../views/home.hbs", "utf8");

    let compiled_page = Handlebars.compile(home)({
        title: "Animalec",
        style: {
            background_color: "#2b589f",
            text_color: "#FFFFFF"
        },
        content: {
            logo: "../assets/images/logo.png",
            title: "ANIMALEC API",
            text: 'API do Livro da FCA "Desenvolvimento Avançado para a Web"'
        }
    });

    return res.status(200).send(compiled_page)

}