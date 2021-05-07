window.addEventListener('load', () => {

    autocomplete(document.querySelector('#reason-input'));

});

const arr = [
    'x-rays', 'cleaning', 'complete exam',
    'molar pain', 'extraction','jaw pain',
    'gum pain', 'swollen gum', 'fillings',
    'root canal', 'extraction', 'wisdom tooth extraction',
    'whitening', 'composite', 'implant',
    'crown', 'bridge', 'full denture',
    'partial denture', 'orthodontics', 'oral appliances',
    'preventive care', 'periodental therapy', 'deep cleaning',
    'nutritional counseling', 'general counseling', 'chipped tooth',
    'difficulty breathing', 'canine pain', 'premolar pain',
    'incisor pain', 'bleeding gum/tooth'
]

autocomplete = (input) => {
    
    let parent = document.querySelector('#autocomplete-node');

    input.addEventListener('input', (e) => {
        
        closeAllLists();

        let value = document.querySelector('#reason-input').value;

        if(!value) {return false;}
        
        selection = -1;
        
        let div = document.createElement('DIV');
        div.setAttribute('class', 'autocomplete-items');
        parent.appendChild(div);
        
        for (let i = 0; i < arr.length; i++) {
        
            if (arr[i].toUpperCase().includes(value.toUpperCase())) {
                
                let str = document.createElement("DIV");
                str.innerHTML = arr[i]; 
                str.addEventListener('click', () => {

                    input.value = arr[i];
                    closeAllLists();

                });
                div.appendChild(str);

            }

        }

    });

    closeAllLists = (e) => {
      
        let items = document.querySelectorAll('.autocomplete-items');

        for (let i = 0; i < items.length; i++) {

            if (e != items[i] && e != input) {
                
                document.querySelector('#autocomplete-node').removeChild(items[i]);

            }

        }

    }

}