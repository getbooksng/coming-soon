const form = document.querySelector('form');
const submitButton = document.querySelector('button');
const responseMessage = document.querySelector('.response');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.elements.email.value;
    submitButton.innerText = 'Sending...';
    submitButton.disabled = true;
    responseMessage.innerText = "";

    fetch("https://beta-api.getbooks.ng/waitlist/join", {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email
        })
    })
        .then(res => res.json())
        .then(result => {
            if(result.error) {
                console.log(result.message);
                responseMessage.innerText = typeof result.message === 'string' ? result.message : result.message[0];
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
