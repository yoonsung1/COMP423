window.addEventListener('load', () => {
    
    toggleMenu();
    alert('hll');
 

})

toggleMenu = () => {
    document.querySelector('.hamburger-menu').addEventListener('click', () => {
        document.querySelector('.container').classList.toggle('change');
    });
}