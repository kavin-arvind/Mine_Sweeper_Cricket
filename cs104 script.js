grid_size="150px";
grid_height="50px"
btn_size="90px";
grid_width=0;
fielders=11;
score=0;
gamestarted=0;
gridselected=0;
scores_list=[0,1,2,3,4,6];
score_prob=[11,-1,5,3,5,4];
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
function grid_no(n){
    //document.getElementById("output").textContent="";
    document.getElementById("griding").innerHTML='';
    grid_width=n;
    gridselected=1;
    for(let i=0;i<grid_width*grid_width;i++){
        document.getElementById("griding").innerHTML+='<div class="grid-item" id="b'+String(i)+'" onclick="game_middle('+String(i)+')"></div>';
    }
    temp1='';
    temp2='';

    for(let i=1;i<=grid_width;i++){
        temp1+=grid_size+" ";
        temp2+=grid_height+" ";

    }//this is to mention optimum grid size
    grid_width=n;//grid_width mentions the width of the grid.. i.e 6 or 7
    document.getElementById("griding").style.gridTemplateColumns= temp1;
    document.getElementById("griding").style.gridTemplateRows=temp2;
    document.getElementsById("griding").style.length= 1000;//the width of the total grid container is 1000px
    document.getElementsById("griding").style= grid_size;
    
}

function multiplayer(num_players){
    game_start2(num_players);

}
function status_content(a){
    if(a==0){return "got out";}
    else{return "playing currently";}
}

function game_start(){
    num_players=parseInt(document.getElementById("num-players").value);
    if(num_players!=1){
        multiplayer(num_players);return;
    }

    if(gridselected==0){alert("Please select the grid size before starting.") ; return;}
    document.getElementById("final-score").innerHTML="";
    document.getElementById("score-table").innerHTML="";
    document.getElementById("final-winner").innerHTML="";
    document.getElementById("out-animation").innerHTML="OUT";


    document.getElementById("six").onclick=null;
    document.getElementById("seven").onclick=null;
    document.getElementById("six").style.opacity="0.5";//shades out the buttons to imply that they are disabled.
    document.getElementById("seven").style.opacity="0.5";
    document.getElementById("start-btn").style.opacity="0.5";
    document.getElementById("start-btn").onclick=null;
    document.getElementById("griding").style.opacity="1.0";
    l=Array(grid_width*grid_width);
    fill_index=0;
    for(let i=0;i<scores_list.length;i++){
        if(score_prob[i]>0){
            for(var j=fill_index;j<fill_index+score_prob[i];j++){
                l[j]=scores_list[i];
            }
            fill_index=j;
        }
        else{
            let sum= 0;
            for(let i=0;i<score_prob.length;i++){sum+=score_prob[i];}
            sum = sum+1;
            sum=grid_width*grid_width-sum;
            for(var j=fill_index;j<fill_index+sum;j++){
                l[j]=scores_list[i];
            }
            fill_index=j;
        }
    }//fills l with appropriate number of score numbers..
    sl=shuffle(shuffle(shuffle(shuffle(l))));//shuffles the list many times
    gamestarted=1;//a flag that tells if the game is started or not
    score=0;
    document.getElementById("score").innerHTML="<h4>SCORE : "+String(score)+"</h4>";
    document.getElementById("started").innerHTML="<h2>GAME STARTED</h2>";
}
function game_middle(i){

    if(num_players!=1){game_middle2(i);return;}
    if(!gamestarted){alert("Please start the game before playing");return;}

    id="b"+String(i);
    if(sl[i]==0){game_end();return;}

    score+=sl[i];
    document.getElementById("score").innerHTML="<h4>CURRENT SCORE : "+String(score)+"</h4>";
    document.getElementById(id).innerHTML=sl[i];
    document.getElementById(id).onclick=null;
}

function game_end(){
    if(num_players!=1){game_end2();return;}
    displayOutAnimation();
    gamestarted=0;
    document.getElementById("six").onclick= function(){grid_no(6);};
    document.getElementById("seven").onclick= function(){grid_no(7);};
    document.getElementById("six").style.opacity="1.0";
    document.getElementById("seven").style.opacity="1.0";
    document.getElementById("griding").style.opacity="0.5";
    document.getElementById("final-score").innerHTML="<p>Final Score= "+ String(score)+"</p>";
    document.getElementById("started").innerHTML="<h2>GAME COMPLETED</h2>";
    document.getElementById("start-btn").textContent="Start a New Game";
    document.getElementById("start-btn").style.opacity="1.0";
    document.getElementById("start-btn").onclick=function(){game_start();};
    document.getElementById("final-winner").innerHTML="";
    document.getElementById("score").innerHTML="";

    //resets all the buttons to start the game newly
    gridselected=0;
    
    for(let i=0;i<sl.length;i++){
        if(sl[i]==0){
            id="b"+String(i);
            document.getElementById(id).innerHTML="<img src='fielder.jpeg' height=\"40px\" width=\"60px\">";
        }
    }

}
function displayOutAnimation() {//displays animation of the out button
    var outAnimation = document.getElementById("out-animation");
    outAnimation.style.display = "block";
    outAnimation.classList.remove("hide");
    setTimeout(function() {outAnimation.style.display = "none";}, 1000);
}

function game_start2(num_players){

    if(gridselected==0){alert("Please select the grid size before starting.") ; return;}

    document.getElementById("score").innerHTML="";

    document.getElementById("final-score").innerHTML="";
    document.getElementById("six").onclick=null;
    document.getElementById("seven").onclick=null;
    document.getElementById("six").style.opacity="0.5";
    document.getElementById("seven").style.opacity="0.5";
    document.getElementById("start-btn").style.opacity="0.5";
    document.getElementById("start-btn").onclick=null;
    document.getElementById("griding").style.opacity="1.0";
    document.getElementById("final-winner").innerHTML="";
    l=Array(grid_width*grid_width);
    for(let i=0;i<grid_width*grid_width;i++){
        if(i<fielders){l[i]=0;}
        else{l[i]=1;}
    }
    fill_index=0;
    for(let i=0;i<scores_list.length;i++){
        if(score_prob[i]>0){
            for(var j=fill_index;j<fill_index+score_prob[i];j++){
                l[j]=scores_list[i];
            }
            fill_index=j;
        }
        else{
            let sum= 0;
            for(let i=0;i<score_prob.length;i++){sum+=score_prob[i];}
            sum = sum+1;
            sum=grid_width*grid_width-sum;
            for(var j=fill_index;j<fill_index+sum;j++){
                l[j]=scores_list[i];
            }
            fill_index=j;
        }
    }
    sl=shuffle(shuffle(shuffle(shuffle(l))));
    gamestarted=1;

    
    tablecontent=
    `<tr>
        <th>Player</th>
        <th>Score</th>
        <th>status</th>
    </tr>`;
    player_scores=Array(num_players);
    player_status=Array(num_players);//1 implies that the player is playing and 0 implies that he is out
    for(let i=0;i<num_players;i++){
        player_scores[i]=0;
        player_status[i]=1;
        tablecontent+=`
        <tr>
            <td>Player `+String(i+1)+`</td>
            <td>`+String(player_scores[i])+`</td>
            <td>`+String(status_content(player_status[i]))+`</td>
        </tr>`;
        
    }
    document.getElementById("score-table").innerHTML=tablecontent;

    document.getElementById("started").innerHTML="<h2>GAME STARTED</h2>";
    currplayer=0;//at the start of game, player 0 plays
    document.getElementById("turn").innerHTML="<h3>Player "+String(currplayer+1)+"'s turn</h3>";

}
function next_player(){
    let next=(currplayer+1)%num_players;
    while(next!=currplayer){
        if(player_status[next]){break;}
        next=(next+1)%num_players;
    }
    return next;
}
function game_middle2(i){
    
    if(!gamestarted){alert("Please start the game before playing");return;}

    id="b"+String(i);
    if(sl[i]==0){
        document.getElementById(id).innerHTML="<img src='fielder.jpeg' height=\"40px\" width=\"60px\">" ;
        game_end2();
    }

    else if(player_status[currplayer]){
        player_scores[currplayer]+=sl[i];
        currplayer=next_player();
        document.getElementById("turn").innerHTML="<h3>Player "+String(currplayer+1)+"'s turn</h3>";
        document.getElementById(id).innerHTML=sl[i];
    }
    else{
        document.getElementById(id).innerHTML="<img src='fielder.jpeg' height=\"40px\" width=\"60px\">" ; 
    }
    
    tablecontent=
    `<tr>
        <th>Player</th>
        <th>Score</th>
        <th>status</th>
    </tr>`;
    for(let i=0;i<num_players;i++){
        tablecontent+=`
        <tr>
            <td>Player `+String(i+1)+`</td>
            <td>`+String(player_scores[i])+`</td>
            <td>`+String(status_content(player_status[i]))+`</td>
        </tr>`;      
    }
    document.getElementById("score-table").innerHTML=tablecontent;
    
    document.getElementById(id).onclick=null;
   
}
function game_end2(){
    document.getElementById("out-animation").innerHTML="Player "+ String(currplayer+1)+" got OUT";
    displayOutAnimation();
    player_status[currplayer]=0;
    
    game_end2final();
    
    currplayer=next_player();

}
function game_end2final(){
    all_out=0;//tells whether everyone got out or not
    for(let i=0;i<num_players;i++){
        if(player_status[i]!=0){all_out=1;}
    }
    if(all_out==1){return;}

    gamestarted=0;
    let maxscore=-1;
    let winner="Player ";
    for(let i=0;i<num_players;i++){
        if(player_scores[i]>maxscore){maxscore=player_scores[i];}
    }//maxscore is the maximum score achieved among all players
    for(let i=0;i<num_players;i++){
        if(player_scores[i]==maxscore){
            winner+=String(i+1)+", ";
        }
    }//checks who got the maxscore and updates the content of winner
    winner=winner.slice(0,-2);
    winner+= " has won the game";
    document.getElementById("final-winner").innerHTML=winner;
    document.getElementById("six").onclick= function(){grid_no(6);};
    document.getElementById("seven").onclick= function(){grid_no(7);};
    document.getElementById("six").style.opacity="1.0";
    document.getElementById("seven").style.opacity="1.0";
    document.getElementById("griding").style.opacity="0.5";
    document.getElementById("started").innerHTML="<h2>GAME COMPLETED</h2>";
    document.getElementById("turn").innerHTML="";

    document.getElementById("start-btn").textContent="Start a New Game";
    document.getElementById("start-btn").style.opacity="1.0";
    document.getElementById("start-btn").onclick=function(){game_start();};
    gridselected=0;
    for(let i=0;i<sl.length;i++){
        if(sl[i]==0){
            id="b"+String(i);
            document.getElementById(id).innerHTML="<img src='fielder.jpeg' height=\"40px\" width=\"60px\">";
        }
    }
    
}
