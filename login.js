document.addEventListener('DOMContentLoaded', ()=>{
    console.log('script loaded')
    const form =document.getElementById('info2')
  

    form.addEventListener('submit' , async(e) =>{
        e.preventDefault()
        // alert('clicked')

        const email= document.getElementById('myemail').value;
        const password =document.getElementById('pass').value;
        const authMsg =document.getElementById('auth-msg');

        try{
            const response =await fetch('http://localhost:2000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            const data = await response.json()
            console.log('Login response:', data); // Should contain the token
            if (!response.ok) {
                authMsg.textContent = data.message || 'Login failed';
            } else{
                authMsg.textContent = data.message;
                
                // Store the token in localStorage for later use
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    console.log('Token stored:', localStorage.getItem('token'));

                    // Redirect if a redirect URL is provided
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    }
                } else {
                    authMsg.textContent = 'No token received';
                }
            }
        } catch(err) {
            authMsg.textContent ='An error occured'
        }
    })
})