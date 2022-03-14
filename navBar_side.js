const buttonListNode = document.getElementById('buttonList');
const navBarNode = document.getElementById('navBar');

const desplegar = () => {
    if(navBarNode.classList.contains('show')){
        navBarNode.classList.remove('show');
    }
    else
    navBarNode.classList.add('show');
}

buttonListNode.addEventListener('click', desplegar);

