function pion(piece,couleurpiece){
    this.couleurpiece = couleurpiece;
    this.piece = piece;
}

var timerj1 = document.getElementById('timerJ1');
var timerj2 = document.getElementById('timerJ2');

var tab = [];
var echiquier = document.getElementById('echiquier')
var nbrcaze;
const input = document.getElementById('myfileechiquier');
var tabpion = [];
var posx;
var posy;

//Fichier des positions
const inputP = document.getElementById('myfilepiece');
function ReadAndPrintMyFilePiece()
{
    var myFileP = this.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function(event)
    {
        var fileContent = event.target.result;

        var fileContentArray = event.target.result.split(/\r\n|\n/);
        for(var i = 0; i < fileContentArray.length - 1; i++){
            
                var piontemp = new pion;
                piontemp.piece = parseInt(fileContentArray[i][0]);
                piontemp.couleurpiece = parseInt(fileContentArray[i][2]);

                posy = fileContentArray[i][4];
                posy = posy.charCodeAt(0);
                posy = posy -65;
                posx = parseInt(fileContentArray[i][6]);
                posx = posx - 1;
                tabpion[posx][posy] = piontemp;
        }
        for(var i = 0; i<nbrcaze-1; i++){
            for(var j = 0; j<nbrcaze-1; j++){
                var img = document.createElement('img');
                    switch(tabpion[i][j].piece){
                        case 1:
                            if(tabpion[i][j].couleurpiece == 1){
                                img.src = "images/PionN.png";
                            }
                            else{
                                img.src = "images/PionB.png";
                            }
                            break;
                        case 2:
                            if(tabpion[i][j].couleurpiece == 1){
                                img.src = "images/TourN.png";
                            }
                            else{
                                img.src = "images/TourB.png";
                            }
                            break;
                        case 3:
                            if(tabpion[i][j].couleurpiece == 1){
                                img.src = "images/CavalierN.png";
                            }
                            else{
                                img.src = "images/CavalierB.png";
                            }
                            break;
                        case 4:
                            if(tabpion[i][j].couleurpiece == 1){
                                img.src = "images/FouN.png";
                            }
                            else{
                                img.src = "images/FouB.png";
                            }
                            break;
                        case 5:
                            if(tabpion[i][j].couleurpiece == 1){
                                img.src = "images/ReineN.png";
                            }
                            else{
                                img.src = "images/ReineB.png";
                            }
                            break;
                        case 6:
                            if(tabpion[i][j].couleurpiece == 1){
                                img.src = "images/RoiN.png";
                            }
                            else{
                                img.src = "images/RoiB.png";
                            }
                            break;
                    }
                img.style.width = 100 + "%";
                img.style.height = 100 + "%";
                tab[i][j].appendChild(img);
                echiquier.appendChild(tab[i][j]);
            }
        }
        
    }
    
    );
    
    reader.readAsText(myFileP);
}

inputP.addEventListener('change', ReadAndPrintMyFilePiece);
//Fichier Timer
const inputT = document.getElementById('myfiletimer');
var tj1;
var tj2;
var min1 = 0;
var min2 = 0;
function ReadAndPrintMyFileTimer()
{
    var myFilet = this.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function(event)
    {
        var fileContent = event.target.result;

        var fileContentArray = event.target.result.split(/\r\n|\n/);
        tj1 = parseInt(fileContentArray[0]);
        tj2 = parseInt(fileContentArray[1]);
        //Dans le fichier le timer est reconvertie en seconde, et je le passe en minute
        while(tj1 > 60){
            min1 = min1 + 1;
            tj1 = tj1 - 60;
        }
        while(tj2 > 60){
            min2 = min2 + 1;
            tj2 = tj2 - 60;
        }
        timerj1.innerHTML = min1 + ":" + tj1;
        timerj2.innerHTML = min2 + ":" + tj2;
    }
    );
    reader.readAsText(myFilet);
}

inputT.addEventListener('change', ReadAndPrintMyFileTimer);

//fichier du plateau
function ReadAndPrintMyFile()
{
    var myFile = this.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function(event)
    {
        var fileContent = event.target.result;

        var fileContentArray = event.target.result.split(/\r\n|\n/);
        nbrcaze = parseInt(fileContentArray[0])

        initechiquier();
    }
    );
    reader.readAsText(myFile);
}

input.addEventListener('change', ReadAndPrintMyFile);

function initechiquier(){
    //Mes cases font 50px et je definit la taille du tableau par rapport au nombre de cases
    echiquier.style.width = (nbrcaze-1) * 50 + "px";
    echiquier.style.height = (nbrcaze-1) * 50 + "px";
    for (var i = 0; i<nbrcaze-1; i++){
        tab.push([]);
        tabpion.push([]);
        for(var j = 0; j < nbrcaze-1; j++){
            var temppion = new pion;
            temppion.couleurpiece = null;
            temppion.piece = null;
            tabpion[i].push(temppion);
            tab[i].push(document.createElement("div"));
            tab[i][j].className = "cell";
            //Je leur donne soit la class noir ou blanc pour faire le damier
            if((i+j)%2 == 0){
                tab[i][j].className ="cell blackcell";
                
            }
            else{
                tab[i][j].className ="cell withecell";
                
            }
            echiquier.appendChild(tab[i][j]);
            tab[i][j].addEventListener("click", clicpiece);
        }
    }
}

function clicpiece(e){
  
    var x;
    var y;
    var pospiecex;
    var pospiecey;

    if(e.target.parentElement.className =="cell elem"){
        for(var i = 0; i<nbrcaze-1;i++){
            for(var j = 0; j<nbrcaze-1; j--){
                if(e.target.parentElement == tab[i][j]){
                    x = i;
                    y = j;
                }
                if(tab[i][j].id == "OUI"){
                    pospiecex = i;
                    pospiecey = j;
                }
            }
        }
    }
    for (let i=0; i < nbrcaze-1; i++){
        for(let j=0; j < nbrcaze-1; j++)
        {
            if (tab[i][j].id == "OUI" || tab[i][j].className == "cell elem"){
                tab[i][j].removeAttribute("id");
                
                if((i+j)%2 == 0)
                {
                    tab[i][j].className = "cell blackcell";
                }
                else
                {
                    tab[i][j].className ="cell whitecell";
                }
            }

            if(e.target.parentElement == tab[i][j])
            {
                x = i;
                y = j;
            }
        }
        
    }
    e.target.parentElement.id ="OUI";
    switch(tabpion[x][y].piece){
        //mise en couleur des cases ou les pieces peuvent aller
        case 1:
            //pion
            // Si blanc y-1, Si noir y+1
            if(tabpion[x][y].couleurpiece == 1){
                if(x+1 < nbrcaze -1){
                    if(tabpion[x+1][y].couleurpiece == null){
                        tab[x+1][y].className = "cell elem";
                    }
                }
            }
            else{
                if(x-1 > -1){
                    if(tabpion[x-1][y].couleurpiece == null){
                        tab[x-1][y].className = "cell elem";
                    }
                }
            }
            break;
            
        case 2:
            //Tour
            //y-- ou y++ ou x-- ou x++
            //x--
           var tempx = x;
           var tempy = y;
            while(tempx-1 > -1 && tabpion[tempx-1][y].couleurpiece == null){
                tab[tempx-1][y].className = "cell elem";
                tempx = tempx-1;
            }
            if(tempx-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx-1][y].couleurpiece){
                    tab[tempx-1][y].className = "cell elem";
                }
            }
            //x++
            tempx = x;
            tempy = y;
            while(tempx+1 < nbrcaze -1 && tabpion[tempx+1][y].couleurpiece == null){
                tab[tempx+1][y].className = "cell elem";
                tempx = tempx+1;
            }
            if(tempx+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx+1][y].couleurpiece){
                    tab[tempx+1][y].className = "cell elem";
                }
            }
            //y--
            tempx = x;
            tempy = y;
            while(tempy-1 > -1 && tabpion[x][tempy-1].couleurpiece == null){
                tab[x][tempy-1].className = "cell elem";
                tempy = tempy-1;
            }
            if(tempy -1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx][tempy-1].couleurpiece){
                    tab[x][tempy-1].className = "cell elem";
                }
            }
            //y++
            tempx = x;
            tempy = y;
            while(tempy+1 < nbrcaze-1 && tabpion[x][tempy+1].couleurpiece == null){
                tab[x][tempy+1].className = "cell elem";
                tempy = tempy+1;
            }
            if(tempy+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[x][tempy+1].couleurpiece){
                    tab[x][tempy+1].className = "cell elem";
                }
            }
            tempx = x;
            tempy = y;
            break;
        case 3:
            //Cavalier
            //y+2 et x+1 ou y+2 et x-1 ou x+2 et y-1 ou x+2 et y+1 ou
            //y-2 et x+1 ou y-2 et x-1 ou x-2 et y-1 ou x-2 et y+1
            //y+2 et x+1
            if(y+2 < nbrcaze -1 && x+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[x+1][y+2].couleurpiece){
                    tab[x+1][y+2].className = "cell elem";
                }
                if(tabpion[x+1][y+2].couleurpiece == null){
                    tab[x+1][y+2].className = "cell elem";
                }    
            }
            //y+2 et x-1
            if(y+2 < nbrcaze -1 && x-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[x-1][y+2].couleurpiece){
                    tab[x-1][y+2].className = "cell elem";
                }
                if(tabpion[x-1][y+2].couleurpiece == null){
                    tab[x-1][y+2].className = "cell elem";
                }    
            }
            //y-1 et x+2
            if(x+2 < nbrcaze -1 && y-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[x+2][y-1].couleurpiece){
                    tab[x+2][y-1].className = "cell elem";
                }
                if(tabpion[x+2][y-1].couleurpiece == null){
                    tab[x+2][y-1].className = "cell elem";
                }    
            }
            //y+1 et x+2
            if(x+2 < nbrcaze -1 && y+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[x+2][y+1].couleurpiece){
                    tab[x+2][y+1].className = "cell elem";
                }
                if(tabpion[x+2][y+1].couleurpiece == null){
                    tab[x+2][y+1].className = "cell elem";
                }    
            }
            //y+1 et x-2
            if(x-2 > -1 && y+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[x-2][y+1].couleurpiece){
                    tab[x-2][y+1].className = "cell elem";
                }
                if(tabpion[x-2][y+1].couleurpiece == null){
                    tab[x-2][y+1].className = "cell elem";
                }    
            }
            //y-1 et x-2
            if(x+2 > -1 && y-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[x-2][y-1].couleurpiece){
                    tab[x-2][y-1].className = "cell elem";
                }
                if(tabpion[x-2][y-1].couleurpiece == null){
                    tab[x-2][y-1].className = "cell elem";
                }    
            }
             //y-2 et x+1
             if(y+2 > -1 && x+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[x+1][y-2].couleurpiece){
                    tab[x+1][y-2].className = "cell elem";
                }
                if(tabpion[x+1][y-2].couleurpiece == null){
                    tab[x+1][y-2].className = "cell elem";
                }    
            }
            //y-2 et x-1
            if(y+2 > -1 && x-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[x-1][y-2].couleurpiece){
                    tab[x-1][y-2].className = "cell elem";
                }
                if(tabpion[x-1][y-2].couleurpiece == null){
                    tab[x-1][y-2].className = "cell elem";
                }    
            }
            break;
        case 4:
            //fou
            //y-- et x-- ou y-- et x++ ou y++ et x-- ou y++ et x++
             //x-- et y--
           var tempx = x;
           var tempy = y;
            while(tempx-1 > -1 && tempy-1 > -1 && tabpion[tempx-1][tempy-1].couleurpiece == null){
                tab[tempx-1][tempy-1].className = "cell elem";
                tempx = tempx-1;
                tempy = tempy-1;
            }
            if(tempx-1 > -1 && tempy-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx-1][tempy-1].couleurpiece){
                    tab[tempx-1][tempy-1].className = "cell elem";
                }
            }
            //x++ && y--
            tempx = x;
            tempy = y;
            while(tempx+1 < nbrcaze -1 && tempy-1 > -1 && tabpion[tempx+1][tempy-1].couleurpiece == null){
                tab[tempx+1][tempy-1].className = "cell elem";
                tempx = tempx+1;
                tempy = tempy-1;
            }
            if(tempx+1 < nbrcaze -1 && tempy > -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx+1][tempy-1].couleurpiece){
                    tab[tempx+1][tempy-1].className = "cell elem";
                }
            }
            //y++ && x--
            tempx = x;
            tempy = y;
            while(tempy+1 < nbrcaze -1 && tempx-1 > -1 && tabpion[tempx-1][tempy+1].couleurpiece == null){
                tab[tempx-1][tempy+1].className = "cell elem";
                tempy = tempy+1;
                tempx = tempx-1;
            }
            if(tempx -1 > -1 && tempy+1 < nbrcaze-1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx-1][tempy+1].couleurpiece){
                    tab[tempx-1][tempy+1].className = "cell elem";
                }
            }
            //y++ && x++
            tempx = x;
            tempy = y;
            while(tempy+1 < nbrcaze-1 && tempx+1 < nbrcaze -1 && tabpion[tempx+1][tempy+1].couleurpiece == null){
                tab[tempx +1][tempy+1].className = "cell elem";
                tempy = tempy+1;
                tempx = tempx+1;
            }
            if(tempy+1 < nbrcaze -1 && tempx+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx+1][tempy+1].couleurpiece){
                    tab[tempx+1][tempy+1].className = "cell elem";
                }
            }
            tempx = x;
            tempy = y;
            break;
        case 5:
            //dame
            //y-- et x-- ou y-- et x++ ou y++ et x-- ou y++ et x++ ou
            //y-- ou y++ ou x-- ou x++
            //x--
           var tempx = x;
           var tempy = y;
            while(tempx-1 > -1 && tabpion[tempx-1][y].couleurpiece == null){
                tab[tempx-1][y].className = "cell elem";
                tempx = tempx-1;
            }
            if(tempx-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx-1][y].couleurpiece){
                    tab[tempx-1][y].className = "cell elem";
                }
            }
            //x++
            tempx = x;
            tempy = y;
            while(tempx+1 < nbrcaze -1 && tabpion[tempx+1][y].couleurpiece == null){
                tab[tempx+1][y].className = "cell elem";
                tempx = tempx+1;
            }
            if(tempx+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx+1][y].couleurpiece){
                    tab[tempx+1][y].className = "cell elem";
                }
            }
            //y--
            tempx = x;
            tempy = y;
            while(tempy-1 > -1 && tabpion[x][tempy-1].couleurpiece == null){
                tab[x][tempy-1].className = "cell elem";
                tempy = tempy-1;
            }
            if(tempy -1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx][tempy-1].couleurpiece){
                    tab[x][tempy-1].className = "cell elem";
                }
            }
            //y++
            tempx = x;
            tempy = y;
            while(tempy+1 < nbrcaze-1 && tabpion[x][tempy+1].couleurpiece == null){
                tab[x][tempy+1].className = "cell elem";
                tempy = tempy+1;
            }
            if(tempy+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[x][tempy+1].couleurpiece){
                    tab[x][tempy+1].className = "cell elem";
                }
            }
            tempx = x;
            tempy = y;
            //x-- et y--
            while(tempx-1 > -1 && tempy-1 > -1 && tabpion[tempx-1][tempy-1].couleurpiece == null){
                tab[tempx-1][tempy-1].className = "cell elem";
                tempx = tempx-1;
                tempy = tempy-1;
            }
            if(tempx-1 > -1 && tempy-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx-1][tempy-1].couleurpiece){
                    tab[tempx-1][tempy-1].className = "cell elem";
                }
            }
            //x++ && y--
            tempx = x;
            tempy = y;
            while(tempx+1 < nbrcaze -1 && tempy-1 > -1 && tabpion[tempx+1][tempy-1].couleurpiece == null){
                tab[tempx+1][tempy-1].className = "cell elem";
                tempx = tempx+1;
                tempy = tempy-1;
            }
            if(tempx+1 < nbrcaze -1 && tempy-1 > -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx+1][tempy-1].couleurpiece){
                    tab[tempx+1][tempy-1].className = "cell elem";
                }
            }
            //y++ && x--
            tempx = x;
            tempy = y;
            while(tempy+1 < nbrcaze -1 && tempx-1 > -1 && tabpion[tempx-1][tempy+1].couleurpiece == null){
                tab[tempx-1][tempy+1].className = "cell elem";
                tempy = tempy+1;
                tempx = tempx-1;
            }
            if(tempx -1 > -1 && tempy+1 < nbrcaze-1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx-1][tempy+1].couleurpiece){
                    tab[tempx-1][tempy+1].className = "cell elem";
                }
            }
            //y++ && x++
            tempx = x;
            tempy = y;
            while(tempy+1 < nbrcaze-1 && tempx+1 < nbrcaze -1 && tabpion[tempx+1][tempy+1].couleurpiece == null){
                tab[tempx +1][tempy+1].className = "cell elem";
                tempy = tempy+1;
                tempx = tempx+1;
            }
            if(tempy+1 < nbrcaze -1 && tempx+1 < nbrcaze -1){
                if(tabpion[x][y].couleurpiece != tabpion[tempx+1][tempy+1].couleurpiece){
                    tab[tempx+1][tempy+1].className = "cell elem";
                }
            }
            tempx = x;
            tempy = y;
            break;
        case 6:
            //Roi
            //y+1 ou y-1 ou x+1 ou x-1 ou x-1 et y+1 ou x-1 et y-1 ou
            //x+1 et y+1 ou x+1 et y-1
            //x+1
            if(x+1 < nbrcaze-1){
                if(tabpion[x+1][y].couleurpiece == null){
                    tab[x+1][y].className = "cell elem";
                }
                if(tabpion[x][y].couleurpiece != tabpion[x+1][y].couleurpiece){
                    tab[x+1][y].className = "cell elem";
                }
            }
            //x-1
            if(x-1 > -1){
                if(tabpion[x-1][y].couleurpiece == null){
                    tab[x-1][y].className = "cell elem";
                }
                if(tabpion[x][y].couleurpiece != tabpion[x-1][y].couleurpiece){
                    tab[x-1][y].className = "cell elem";
                }
            }
            //y+1
            if(y+1 < nbrcaze-1){
                if(tabpion[x][y+1].couleurpiece == null){
                    tab[x][y+1].className = "cell elem";
                }
                if(tabpion[x][y].couleurpiece != tabpion[x][y+1].couleurpiece){
                    tab[x][y+1].className = "cell elem";
                }
            }
            //y-1
            if(y-1 > -1){
                if(tabpion[x][y-1].couleurpiece == null){
                    tab[x][y-1].className = "cell elem";
                }
                if(tabpion[x][y].couleurpiece != tabpion[x][y-1].couleurpiece){
                    tab[x][y-1].className = "cell elem";
                }
            }
            //y+1 && x+1
            if(y+1 < nbrcaze-1 && x+1 < nbrcaze-1){
                if(tabpion[x+1][y+1].couleurpiece == null){
                    tab[x+1][y+1].className = "cell elem";
                }
                if(tabpion[x][y].couleurpiece != tabpion[x+1][y+1].couleurpiece){
                    tab[x+1][y+1].className = "cell elem";
                }
            }
            //y+1 && x-1
            if(y+1 < nbrcaze-1 && x-1 > -1){
                if(tabpion[x-1][y+1].couleurpiece == null){
                    tab[x-1][y+1].className = "cell elem";
                }
                if(tabpion[x][y].couleurpiece != tabpion[x-1][y+1].couleurpiece){
                    tab[x-1][y+1].className = "cell elem";
                }
            }
            //y-1 && x+1
            if(y+1 > -1 && x+1 < nbrcaze-1){
                if(tabpion[x+1][y-1].couleurpiece == null){
                    tab[x+1][y-1].className = "cell elem";
                }
                if(tabpion[x][y].couleurpiece != tabpion[x+1][y-1].couleurpiece){
                    tab[x+1][y-1].className = "cell elem";
                }
            }
            //y-1 && x-1
            if(y+1 > -1 && x-1 > -1){
                if(tabpion[x-1][y-1].couleurpiece == null){
                    tab[x-1][y-1].className = "cell elem";
                }
                if(tabpion[x][y].couleurpiece != tabpion[x-1][y-1].couleurpiece){
                    tab[x-1][y-1].className = "cell elem";
                }
            }
    }
}