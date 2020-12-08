




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    const queryString = `/weather?address=${location}`
    messageTwo.innerText = 'Loading...';
    messageOne.innerText='';

    fetch(queryString).then((response)=>{
        response.json().then((data)=> {
            if(data.error){
                messageTwo.innerText=data.error;
            }else{
                messageOne.innerText=data.location;
                messageTwo.innerText=data.forecast;
            }
    
        });
    });
});