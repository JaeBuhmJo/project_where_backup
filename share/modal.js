window.addEventListener('click', (e) => {
    console.log(e.target.className);
    e.target.className=="modal" ?  close_modal() : false
    
})

function close_modal(){
    document.getElementsByClassName("modal")[0].style.display="none";
}
