const form = document.querySelector('form');
const submitButton = document.querySelector('button');
const responseMessage = document.querySelector('.response');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.elements.email.value;
    submitButton.innerText = 'Sending...';
    submitButton.disabled = true;
    responseMessage.innerText = "";

    fetch("https://site-server.herokuapp.com/send", {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email,
            gb: true
        })
    })
        .then(res => res.json())
        .then(result => {
            if(result.error) {
                console.log(result.error);
                responseMessage.innerText = result.error
            } else {
                form.reset();
                responseMessage.innerText = 'You have been added to the waitlist 🎉'
            }
        })
        .catch(err => {
            console.log(err)
            responseMessage.innerText = 'Network error, please retry.'
        })
        .finally(() => {
            submitButton.innerText = 'Notify Me';
            submitButton.disabled = false;
        })

})