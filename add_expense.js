document.addEventListener('DOMContentLoaded', () =>{
    const form= document.getElementById('info3')

    form.addEventListener('submit', async(e) =>{
        e.preventDefault()


        const expenseName=document.getElementById('exp_name').value
        const amount =document.getElementById('amount').value
        const expenseCategory=document.getElementById('exp_category').value
        const paymentMode=document.getElementById('pay_mode').value
        const time=document.getElementById('time').value
        const description=document.getElementById('description').value
        const authMsg=document.getElementById('auth-msg')

        const token = localStorage.getItem('token');
        console.log(token)

        if (token){
            try{
                const response= await fetch('http://localhost:2000/add_expense',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
    
                    body: JSON.stringify({expenseName, amount, expenseCategory, paymentMode, time, description})
                });
    
                const data=response.data
                if (!response.ok){
                    authMsg.textContent=data
                }else{
                    authMsg.textContent='Expense added successfully'
                }
            } catch(err){
                authMsg.textContent='An error occurred'+ err
            }
        } else {
            console.error('No token found, please log in again.');
        }

    })

    // Logout function
    function logout() {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page or home page
        window.location.href = 'login.html';
    }

    // Add event listener for logout button
    document.getElementById('logout-button').addEventListener('click', () => {
        logout();
    });
    

})