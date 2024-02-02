exports.employeesList = async (req, res) =>{

    const employees = [
        {
          name: "Irène NGO BALA",
          image: "../../../../../assets/img/about/pauline.webp",
          position: "Resp d'agence Douala"
        },
        {
          name: "Esther KOUMBELECK",
          image: "../../../../../assets/img/about/esther.webp",
          position: "Resp d'agence Yaoundé"
        },
        {
          name: "Horlande BAKOM",
          image: "../../../../../assets/img/about/horlande.webp",
          position: "Agent comptoir"
        },
        {
          name: "Christelle ONGBALOUEK",
          image: "../../../../../assets/img/about/christelle.webp",
          position: "Agent comptoir"
        },
        {
          name: "Valentin ABENG",
          image: "../../../../../assets/img/about/valentin.webp",
          position: "Commerciale"
        },
        {
          name: "Claire HAMBO",
          image: "../../../../../assets/img/about/claire.webp",
          position: "Commerciale"
        },
        {
          name: "Samuel MANDENG",
          image: "../../../../../assets/img/about/samuel.webp",
          position: "PDG"
        }
        
        ]

      res.json(employees)
}