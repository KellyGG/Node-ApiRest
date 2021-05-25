
module.exports.mutante =(matriz)=>
{
    let isMutante= false;

    for (i = 0; i < matriz.length; i++) {

        for (j = 0; j < matriz[0].length-3; j++) {  

            if ((matriz[i][j] === matriz[i][j+1] 
                && matriz[i][j] === matriz[i][j+2]
                && matriz[i][j] === matriz[i][j+3]
               ) ||
               (matriz[j][i]=== matriz[j+1][i]
                && matriz[j][i] === matriz[j+2][i]
                && matriz[j][i] ===  matriz[j+3][i])

               )
                {
                    isMutante=true;
                }
                if(i==j)
                {
                    if(matriz[i][j]=== matriz[i+1][j+1]
                        && matriz[i][j]=== matriz[i+2][j+2]
                        && matriz[i][j]=== matriz[i+3][j+3]
                        )
                    {
                        isMutante=true;
                    }
            
                }
    
        }
     

    }

    return isMutante;
}
