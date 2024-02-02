const { aws } = require('../../config/dot-env');
const { s3 } = require('../../config/aws-config')

exports.getOptionList = async (req, res) =>{

  try{

/*
    let queryParams = {}

    if(req.query){
        queryParams = {...req.query};
    }

    if(req.query.active){
        queryParams = {
            ...queryParams,
            active : true 
        }
    }
*/
    const popularFlights = await PopularFlight.find(
        queryParams
    );

    const optionList = [
        {
            option : "Accompagnement",
            possibilities : [
                "Fritte (pomme de terre)",
                "Riz",
                "Alloco",
                "Bobolo"
            ]
        }
    ]
    
    res.status(200).json(
        {
            success: true,
            message : optionList
        }
    );
} catch(e){
    return res.status(500).json(
        {
            success: false,
            message : 'Erreur inconnue, contactez le web master'
        }
    )
  }
}

exports.createOption = async (req, res) => {
  //We verify if there is a file
  
  try{


    console.log(req.body);
    /*
      await popularFlight.save()
      .then(()=>{
          return res.status(201).json({
              success: true,
              message: "Vol populaire créé avec succès"
          });
      })
      */

  } catch(err){
    console.log("error")
    console.log(err)
    return res.status(500).json(
      {
          success: false,
          message : 'Erreur lors de la création, contactez le web master'
      }
    )
  }
}