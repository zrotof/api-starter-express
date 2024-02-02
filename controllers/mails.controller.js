const { evMailReceiverContact, evMailReceiverFlight, evMailReceiverHostel, evMailReceiverApartment, evMailReceiverTourism, evMailReceiverDhl, evMailReceiverCar, evMailReceiverCarParis, evMailReceiverNews, mailgunApiKey, mailgunDomain, mailgunSenderEmail, mailgunUsername, mailgunApiUrl } = require('../config/dot-env');

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const client = mailgun.client({
    username: mailgunUsername,
    key: mailgunApiKey,
    url: mailgunApiUrl
})

exports.sendContactMail = async (req, res) =>{

    const { civility, firstname, lastname, email, phone, preference, subject, message, countryName, countryDialCode } = req.body;

        let finalSubject = "Contact | " + subject ;

        const personalData = (phone.length > 0)? (civility + " " + firstname + " " + lastname +"\n" +email +"\n" +countryName+ " (" +countryDialCode+ ") " + phone) : (civility + " " + firstname + " " + lastname +"\n" +email)

        const preferences = "NB: je souhaite être recontacté par " + preference

        let messageBody = message + "\n\n" + preferences+ "\n\n"+ personalData;
   
        const mailData = {
            from: mailgunSenderEmail,
            to: evMailReceiverContact,
            subject: finalSubject,
            text: messageBody
        };

        await client.messages.create(mailgunDomain, mailData)
        .then( () =>{
            res.json({message: 'success'})
        })
        .catch((err)=>{
            res.json({message: 'error'})
        })
}

exports.sendFlightMail = async (req, res) =>{
    
    const { way, cabine, departure, arrival, dateDep, dateRet, adult, child, infant, lastname, email, phone, countryName, countryDialCode, message } = req.body;
    
    let finalSubject = "Vols | Billet d'avion";

    const personalData = (phone.length > 0)? (lastname +"\n" +email +"\n" +countryName+ " (" +countryDialCode+ ") " + phone) : (lastname +"\n" +email)     

    let recap = "Pouvez-vous m'indiquer les prix et différentes possibilités pour mon voyage?"
            +"\n"+"Information de réservation" 
            + "\n\n" +"Trajet : "+way
            + "\n" + "Cabine : " + cabine
            +((departure.selectedItem)?("\nDépart : " + departure.selectedItem) : ("\nDépart : "+departure))
            +((arrival.selectedItem)?("\nArrivée : " + arrival.selectedItem) : ("\nArrivée : " +arrival))
            + "\n" +"Date départ : " + dateDep.split('T')[0]
            +((dateRet.length > 0)?("\nDate retour : " +dateRet.split('T')[0]) : "")
            +((adult.toString().length > 0)?("\nPassager(s) adulte(s) : " + adult) : "")
            +((child.toString().length > 0)?("\nPassager(s) enfant(s) : " + child): "")
            +((infant.toString().length > 0)?("\nPassager(s) bébé(s) : " + infant) : "")

            let messageBody = ((message.length>0)?(message):"Bonjour") + "\n" + recap + "\n\n" + personalData;

            const mailData = {
                from: mailgunSenderEmail,
                to: evMailReceiverFlight,
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(mailgunDomain, mailData)
            .then( () =>{
                res.json({message: 'success'})
            })
            .catch((err)=>{
                res.json({message: 'error'})
            })
}

exports.sendDhlMail = async (req, res) =>{
    
    const { civility, firstname, lastname, email, phone, country, weight, contains, dimensions, countryName, countryDialCode } = req.body;
    
    let finalSubject = "DHL | Dévis expédition colis" ;
        
    const personalData = (phone.length > 0)? (civility + " " + firstname + " " + lastname +"\n" +email +"\n" +countryName+ " (" +countryDialCode+ ") " + phone) : (civility + " " + firstname + " " + lastname +"\n" +email)
            
        let info = "Bonjour,\n\nJ'aimerais simuler une expédition DHL pour avoir un apperçu du prix."+ "\n\n"+
                    "Informations d'expédition" + "\n\n" + 
                    "Départ : Cameroun" + "\n" +
                    "Destination : "+country + "\n" + 
                    "Poids : " + weight + "kg\n" +
                    "Contenu : " + contains + "\n" +
                    "Dimensions du colis : " + dimensions ;

        let messageBody = info + "\n\n" + personalData;


            const mailData = {
                from: mailgunSenderEmail,
                to: evMailReceiverDhl,
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(mailgunDomain, mailData)
            .then( () =>{
                res.json({message: 'success'})
            })
            .catch((err)=>{
                res.json({message: 'error'})
            })
}

exports.sendCarMail = async (req, res) =>{
    
    const {reason, town, capacity, driver, dateDeb, dateFin, heureDeb, heureFin, extras, civility, firstname, lastname, email, phone, countryName,countryDialCode} = req.body;
    
    let finalSubject = "Voiture | Location de voiture" ;
        
    const personalData = (phone.length > 0)? (civility + " " + firstname + " " + lastname +"\n" +email +"\n" +countryName+ " (" +countryDialCode+ ") " + phone) : (civility + " " + firstname + " " + lastname +"\n" +email)
        
        let extrasList = [];

        if(extras.length > 0){
            extras.forEach((element) => {
                extrasList.push(element+" ")
            });
        }

        let info = "Bonjour,\n\nJ'aimerais louer un véhicule \n\n"
                    +"Information de location \n\n"
                    + "Motif de location : " +reason + "\n" 
                    + "Ville : " + town + "\n"
                    + "Nombre de places : " + capacity + "\n"
                    + "Location : " + driver + "\n"
                    + "Date début : " + dateDeb.split('T')[0] + ((heureDeb.length>0)? " à "+heureDeb: "")  + "\n"
                    + "Date fin : " + dateFin.split('T')[0] + ((heureFin.length>0)? " à "+heureFin: "") + "\n"
                    + ((extras.length > 0)?"Extras : " + extrasList : "")

        let messageBody = info + "\n\n" + personalData;

        
            const mailData = {
                from: mailgunSenderEmail,
                to: evMailReceiverCar,
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(mailgunDomain, mailData)
            .then( () =>{
                res.json({message: 'success'})
            })
            .catch((err)=>{
                res.json({message: 'error'})
            })
}

exports.sendApartMail = async (req, res) =>{
    
    const {type, bedroom, toilet, maxprice, town, dateDeb, dateFin, extras, civility, firstname, lastname, email, phone, countryName, countryDialCode, currency} = req.body;

    const personalData = (phone.length > 0)? (civility + " " + firstname + " " + lastname +"\n" +email +"\n" +countryName+ " (" +countryDialCode+ ") " + phone) : (civility + " " + firstname + " " + lastname +"\n" +email)
        
        let finalSubject = "Appartement | Location appartement meublé" ;

        let extrasList = [];

        if(extras.length > 0){
            extras.forEach(element => {
                extrasList.push(element+" ")
            });
        }

        let info = "Bonjour,\n\nJ'aimerais louer un appartement \n\n"
                    +"Information de location \n\n"
                    + "Type de logement : " +type.name+ "\n" 
                    + "Ville : " + town + "\n"
                    + "Date début : " + dateDeb.split('T')[0] +"\n"
                    + "Date fin : " + dateFin.split('T')[0]
                    + ((bedroom.name.length > 0)?"\nNombre de chambre(s) : " + bedroom.name : "\nNombre de chambre(s) : pas indiqué")
                    + ((toilet.name.length > 0)?"\nNombre de salle(s) de bain : " + toilet.name : "\nNombre de salle(s) de bain : pas indiqué")
                    + ((maxprice.length > 0)?"\nPrix maximum accepté : " + maxprice + " "+currency : "\nPrix maximum accepté : pas indiqué")
                    + ((extras.length > 0)?"\nExtras : " + extrasList : "")

        let messageBody = info + "\n\n" + personalData;

            const mailData = {
                from: mailgunSenderEmail,
                to: evMailReceiverApartment,
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(mailgunDomain, mailData)
            .then( () =>{
                res.json({message: 'success'})
            })
            .catch((err)=>{
                res.json({message: 'error'})
            })
}

exports.sendHostelMail = async (req, res) =>{
    
    const {nbr, town, dateDeb, dateFin, extras, civility, firstname, lastname, email, phone, hotels, countryName, countryDialCode} = req.body;

    const personalData = (phone.length > 0)? (civility + " " + firstname + " " + lastname +"\n" +email +"\n" +countryName+ " (" +countryDialCode+ ") " + phone) : (civility + " " + firstname + " " + lastname +"\n" +email)

    let finalSubject = "HÔTEL | Hébergement hôtel" ;

        let extrasList = [];

        if(extras.length > 0){
            extras.forEach(element => {
                extrasList.push(element+" ")
            });
        }

        let info = "Bonjour,\n\nJ'aimerais effectuer une réservation d'hôtel \n\n"
            +"Informations de réservation \n\n"
            + "Nombre de chambre(s) : " +nbr + "\n" 
            + "Ville : " + town + "\n"
            + "Date début : " + dateDeb.split('T')[0] +"\n"
            + "Date fin : " + dateFin.split('T')[0] +"\n"
            +((extras.length > 0)?("Extras : " + extrasList+"\n") : "")
            +((hotels.toString().length > 0)?("Regardez en priorité: " + hotels) : "")
        
        let messageBody = info + "\n\n" + personalData;

        
            const mailData = {
                from: mailgunSenderEmail,
                to: evMailReceiverHostel,
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(mailgunDomain, mailData)
            .then( () =>{
                res.json({message: 'success'})
            })
            .catch((err)=>{
                res.json({message: 'error'})
            })
}

exports.sendCarParisMail = async (req, res) =>{
    
    const {departure, arrival, date, hour, civility, firstname, lastname, email} = req.body;

    let personalData = civility + " " + firstname + " " + lastname +"\n" +email ;

        let finalSubject = "CAR-PARIS | Location VTC Paris" ;

        let info = "Bonjour,\n\nInformations de réservation \n\n"
            + "Adresse de départ : " + departure + "\n" 
            + "Adresse d'arrivée : " + arrival + "\n"
            + "Date : " + date+"\n"
            + "Heure : " + hour;

        let messageBody = info + "\n" + personalData;

            const mailData = {
                from: mailgunSenderEmail,
                to: evMailReceiverCarParis,
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(mailgunDomain, mailData)
            .then( () =>{
                res.json({message: 'success'})
            })
            .catch((err)=>{
                res.json({message: 'error'})
            })
}

exports.sendTourMail = async (req, res) =>{
    
    const {circuit,date,logement,civility,lastname,firstname,email,nombrePassagerAdult,nombrePassagerEnfant,nombrePassagerBebe, phone, countryName, countryDialCode} = req.body;

    const personalData = (phone.length > 0)? (civility + " " + firstname + " " + lastname +"\n" +email +"\n" +countryName+ " (" +countryDialCode+ ") " + phone) : (civility + " " + firstname + " " + lastname +"\n" +email)

        let finalSubject = "Tourisme | Demande de réservation" ;

        let info = "Informations de réservation : \n\n"
            + "Date : " + date.split('T')[0] + "\n"
            + "Logement : " +logement+ "\n"
            + "Nombre de personnes total : " + ( nombrePassagerAdult +  nombrePassagerEnfant + nombrePassagerBebe) + "\n"
            + "--->Adulte(s) : " + nombrePassagerAdult + "\n"
            + "--->Enfant(s) : " +nombrePassagerEnfant + "\n"
            + "--->Bébés(s) : " +nombrePassagerBebe

        let messageBody = "Bonjour,\nJe souhaite faire une réservation pour le circuit touristique intitulé : " + circuit+
            "\n\n" +info + 
            "\n\n" + personalData;
    
            const mailData = {
                from: mailgunSenderEmail,
                to: evMailReceiverTourism,
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(mailgunDomain, mailData)
            .then( () =>{
                res.json({message: 'success'})
            })
            .catch((err)=>{
                res.json({message: 'error'})
            })
}

exports.sendAddNewsletterMail = async (req, res) =>{
    
    const { email } = req.body;
    let finalSubject = "Newsletter | Ajout à la newsletter" ;

        let messageBody = "Bonjour,"
                            +"\nMerci de m'ajouter à votre newsletter pour pouvoir profiter de vos promotions et vos nouvelles offres. "
                            +"\n\n Mon adresse mail: "+ email
                            +"\n\n Bonne journée à vous."
    
            const mailData = {
                from: mailgunSenderEmail,
                to: evMailReceiverNews,
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(mailgunDomain, mailData)
            .then( () =>{

                res.json({message: 'success'})
            })
            .catch((err)=>{
                res.json({message: 'error'})
            })
}






