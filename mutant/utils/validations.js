module.exports.validations=(matriz)=>
{
    console.log("matriz",matriz)
    if(Array.isArray(matriz))
    {
        //validate if the matriz has the same length of rows and columns
        const resultvali=matriz.map(function(elem) {
            if(
                elem.length===matriz.length
            )
            {
                return true;
            }else
            {
                return false;
            }
        });
        return resultvali;
    }
    else
    {
        return false;
    }

}

