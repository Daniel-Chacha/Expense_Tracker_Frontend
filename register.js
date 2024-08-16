document.addEventListener('DOMContentLoaded',() =>{
    const form =document.getElementById('info1')


    form.addEventListener('submit', async(e) =>{
        e.preventDefault()

        const fname =document.getElementById('fname').value
        const lname =document.getElementById('lname').value
        const username= document.getElementById('username').value
        const email =document.getElementById('myemail').value
        const tellno =document.getElementById('tellno').value
        const city= document.getElementById('city').value
        const date =document.getElementById('date').value
        const password= document.getElementById('password').value
        const confirm =document.getElementById('confirm').value
        const authMsg =document.getElementById('auth-msg')

        if (password== confirm){
            try{
                const response =await fetch('http://localhost:2000/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({fname, lname, username, email, tellno, city, date, password})
                });
    
                const data =response.data
                console.log('Data passed to the server')
                //const data =await response.JSON()
    
                if (!response.ok){
                    authMsg.textContent='User Already Exists!'
                } else{
                    authMsg.textContent='Successfully registered.'
                }
            } catch (err){
                authMsg.textContent='An Error occured'
                console.log(err)
            }
           
        } else {
            document.getElementById('auth-msg').innerHTML=`The Repeat password doesn't match the first one`
        }



    })
})