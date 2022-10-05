let music = new Audio("music.mp3")
let turn = 'X';
let gameOver= false
// function to change turn

const changeTurn =()=>{
    return turn==='X'?'O':'X'
}

// function to check for a win
const checkwin =() =>{
    let  boxtext= document.getElementsByClassName('boxtext')
    let wins=[
        [0, 1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    wins.forEach(e=>{
        if((boxtext[e[0]].innerText===boxtext[e[1]].innerText)&&(boxtext[e[1]].innerText===boxtext[e[2]].innerText)&&(boxtext[e[0]].innerText!=='')){
            document.querySelector('.info').innerText= boxtext[e[0]].innerText+" " + "has WON"
            gameOver= true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width= "200px"
        }
    })
}

// game logic
music.play()
let boxes= document.getElementsByClassName('box')

// here boxes will return Htmlcollection so we have to make it an array
// so that i can run a foreach loop

Array.from(boxes).forEach(element=>{
    let boxtext= element.querySelector('.boxtext')
    element.addEventListener('click', ()=>{
        if(boxtext.innerText===''){
            boxtext.innerText= turn;
             turn =changeTurn()
            checkwin()
            if(!gameOver){
                document.getElementsByClassName('info')[0].innerText ="Turn for:"+ turn; 

            }
        }
    })
})

//  let reset= document.getElementsByClassName("reset")
reset.addEventListener('click', ()=>{
  let boxtexts=  document.querySelectorAll('.boxtext')
  Array.from(boxtexts).forEach(el=>{
    el.innerText=""
  })
  turn= 'X'
  gameOver=false
  document.getElementsByClassName('info')[0].innerText= 'Turn For'+" "+ turn;
})