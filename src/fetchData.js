const allCompounds = ['water', 'chromate', 'methanol', 'caffeine', 'cellulose',
    'ethanol', 'sulfuric-acid', 'acetic-acid', 'hydrochloric-acid', 'acetate',
    'ammonia', 'nitric-acid', 'phosphoric-acid', 'calcium-carbonate', 'ammonium-sulfate',
    'carbonic-acid', 'sodium-bicarbonate', 'sodium-hydroxide', 'calcium-hydroxide', 'sucrose',
    'sodium-carbonate', 'phenol', 'nitrous-acid', 'potassium-hydroxide', 'silver-nitrate',
    'sodium-chloride', 'sulfurous-acid', 'magnesium-hydroxide', 'methane', 'nitrogen-dioxide',
   'aluminum-oxide', 'ammonium-nitrate', 'ammonium-phosphate', 'barium-hydroxide', 'iron-oxide',
    'carbon-tetrachloride', 'citric-acid', 'salicylic-acid', 'potassium-carbonate', 'silver-chloride',
    'calcium-acetate', 'sodium-iodide', 'sodium-oxide', 'sodium-sulfide'];

// const compounds = getRandomCompounds(5);

function getDescriptions(compounds) {
    return new Promise(function (resolve, reject) {
        Promise.all(compounds.map(name =>
            fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${name}/description/JSON`)
                .then(res => res.json())))
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getImages(compounds) {
    return new Promise(function (resolve, reject) {
        Promise.all(compounds.map(name =>
            fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${name}/PNG`)
        ))
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getRandomCompounds(num) {
    const shuffled = [...allCompounds].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

export function getData() {
    console.log("getdata");
    const compounds = getRandomCompounds(5);
    return new Promise(function (resolve, reject) {

        let descriptionsPromise = getDescriptions(compounds);
        let imagesPromise = getImages(compounds);

        Promise.all([descriptionsPromise, imagesPromise]).then(data => {
            let descriptions = data[0];
            let images = data[1];
            var compoundsData = [];
            //merge data
            for (let i = 0; i < compounds.length; i++) {
                const comp = {
                    title: descriptions[i].InformationList.Information[0].Title,
                    subtitle: descriptions[i].InformationList.Information[0].CID,
                    description: descriptions[i].InformationList.Information[1].Description,
                    image: images[i].url
                }
                compoundsData.push(comp);
            }
            resolve(compoundsData);
        })
            .catch(error => {
                reject(error);

            })
    });
}
