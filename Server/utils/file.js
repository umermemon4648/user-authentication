const DataURIParser = require('datauri/parser')

const getfileUri = (file)=>{
    const parser = new DataURIParser() 
    parser.format()

}
module.exports = getfileUri