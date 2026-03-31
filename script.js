const size=20

let grid=[]

let blueUnits=[]

let redUnits=[]

let running=false

let interval=null

let speed=300

let timer=0

const gridDiv=document.getElementById("grid")

function createGrid(){

grid=[]

gridDiv.innerHTML=""

for(let r=0;r<size;r++){

let row=[]

for(let c=0;c<size;c++){

row.push(0)

let cell=document.createElement("div")

cell.className="cell"

cell.id=r+"-"+c

gridDiv.appendChild(cell)

}

grid.push(row)

}

}

function spawnUnits(){

blueUnits=[]

redUnits=[]

// blue

for(let i=0;i<5;i++){

let r=Math.floor(Math.random()*size)

let c=Math.floor(Math.random()*size)

blueUnits.push({r,c})

grid[r][c]=3

}

// red

for(let i=0;i<5;i++){

let r=Math.floor(Math.random()*size)

let c=Math.floor(Math.random()*size)

redUnits.push({r,c})

grid[r][c]=4

}

}

function neighbors(unit){

let moves=[

{r:unit.r+1,c:unit.c},

{r:unit.r-1,c:unit.c},

{r:unit.r,c:unit.c+1},

{r:unit.r,c:unit.c-1}

]

return moves.filter(m=>

m.r>=0 &&
m.c>=0 &&
m.r<size &&
m.c<size

)

}

function moveUnit(unit,type){

let n=neighbors(unit)

let enemy= type==3 ? 2 : 1

let neutral=0

let target=n.find(m=>grid[m.r][m.c]==enemy)

if(!target){

target=n.find(m=>grid[m.r][m.c]==neutral)

}

if(!target){

target=n[Math.floor(Math.random()*n.length)]

}

if(target){

// leave territory
grid[unit.r][unit.c]= type==3 ? 1 : 2

unit.r=target.r

unit.c=target.c

grid[unit.r][unit.c]=type

}

}

function moveAll(){

blueUnits.forEach(u=>moveUnit(u,3))

redUnits.forEach(u=>moveUnit(u,4))

}

function draw(){

for(let r=0;r<size;r++){

for(let c=0;c<size;c++){

let cell=document.getElementById(r+"-"+c)

cell.className="cell"

if(grid[r][c]==1)
cell.classList.add("blueTerritory")

if(grid[r][c]==2)
cell.classList.add("redTerritory")

if(grid[r][c]==3)
cell.classList.add("blueUnit")

if(grid[r][c]==4)
cell.classList.add("redUnit")

}

}

}

function score(){

let blue=0

let red=0

for(let r=0;r<size;r++){

for(let c=0;c<size;c++){

if(grid[r][c]==1)blue++

if(grid[r][c]==2)red++

}

}

document.getElementById("blueScore").innerText=blue

document.getElementById("redScore").innerText=red

}

function step(){

timer++

document.getElementById("timer").innerText="Time:"+timer

moveAll()

draw()

score()

if(timer>200){

end()

}

}

function start(){

if(running)return

running=true

interval=setInterval(step,speed)

log("Simulation started")

}

function end(){

running=false

clearInterval(interval)

let blue=document.getElementById("blueScore").innerText

let red=document.getElementById("redScore").innerText

let winner="DRAW"

if(blue>red)winner="BLUE WINS"

if(red>blue)winner="RED WINS"

document.getElementById("winner").innerText=winner

log(winner)

}

function reset(){

clearInterval(interval)

running=false

timer=0

document.getElementById("winner").innerText=""

createGrid()

spawnUnits()

draw()

score()

}

function randomMap(){

reset()

log("Random map generated")

}

function log(text){

let l=document.getElementById("log")

l.innerHTML+=text+"<br>"

l.scrollTop=l.scrollHeight

}

document.getElementById("start").onclick=start

document.getElementById("reset").onclick=reset

document.getElementById("random").onclick=randomMap

document.getElementById("speed").oninput=(e)=>{

speed=e.target.value

if(running){

clearInterval(interval)

interval=setInterval(step,speed)

}

}

reset()