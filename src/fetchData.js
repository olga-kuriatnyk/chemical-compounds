const allCompounds = [
    "water",
    "methanol",
    "caffeine",
    "cellulose",
    "ethanol",
    "sulfuric-acid",
    "acetic-acid",
    "hydrochloric-acid",
    "acetate",
    "ammonia",
    "nitric-acid",
    "phosphoric-acid",
    "calcium-carbonate",
    "ammonium-sulfate",
    "carbonic-acid",
    "sodium-bicarbonate",
    "calcium-hydroxide",
    "sucrose",
    "sodium-carbonate",
    "phenol",
    "nitrous-acid",
    "potassium-hydroxide",
    "silver-nitrate",
    "sulfurous-acid",
    "magnesium-hydroxide",
    "methane",
    "nitrogen-dioxide",
    "aluminum-oxide",
    "ammonium-nitrate",
    "barium-hydroxide",
    "iron-oxide",
    "carbon-tetrachloride",
    "citric-acid",
    "salicylic-acid",
    "potassium-carbonate",
    "silver-chloride",
    "calcium-acetate",
    "sodium-iodide",
    "sodium-oxide",
    "sodium-sulfide"
  ];
  
  // this fuction returns an array with data (compounds name, CID, description, etc)
  function getDescriptionsBatch(compounds) {
    return new Promise(function (resolve, reject) {
      // get a promis for each compound, store in array
      let descrPromises = compounds.map((name) => getDescription(name));
      // if successful return array with data
      Promise.all(descrPromises)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  // make an GET request, to get data for the componound
  function getDescription(compound) {
    return new Promise(function (resolve, reject) {
      fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compound}/description/JSON`
      )
        .then((res) => resolve(res.json()))
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  // this function returns arrys with images
  function getImagesBatch(compounds) {
    return new Promise(function (resolve, reject) {
      let imgPromises = compounds.map((name) => getImage(name));
      Promise.all(imgPromises)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  // make an GET request, to get image for the componound
  function getImage(compound) {
    return new Promise(function (resolve, reject) {
      fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compound}/PNG`
      )
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  function getRandomCompounds(num) {
    const shuffled = [...allCompounds].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  
  // call functions to get data from the API for 5 randomly chosen compounds,
  // then processes recived data, merging into array of compounds
  // return array of 5 compounds including title, subtitle (CID), description and image
  export function getData() {
    const compounds = getRandomCompounds(5);
    return new Promise(function (resolve, reject) {
      let descriptionsPromise = getDescriptionsBatch(compounds);
      let imagesPromise = getImagesBatch(compounds);
  
      Promise.all([descriptionsPromise, imagesPromise])
        .then((data) => {
          let descriptions = data[0];
          let images = data[1];
          var compoundsData = [];
  
          //merge data
          for (let i = 0; i < compounds.length; i++) {
            let titleData =
              descriptions[i].InformationList?.Information[0]?.Title;
            let subtitleData =
              descriptions[i].InformationList?.Information[0]?.CID;
            let descriptionData =
              descriptions[i].InformationList?.Information[1]?.Description;
            let imageData = images[i]?.url;
            const comp = {
              title: titleData,
              subtitle: subtitleData,
              description: descriptionData,
              image: imageData
            };
            compoundsData.push(comp);
          }
          resolve(compoundsData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  