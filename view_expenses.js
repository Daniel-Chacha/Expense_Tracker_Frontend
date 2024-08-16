document.addEventListener('DOMContentLoaded', () =>{
   
    async function fetchExpenses() {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
    
            const response = await fetch('http://localhost:2000/view_expense',{
                method: 'GET', // Assuming you want to use GET method to fetch expenses
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                }
            });
            console.log('data passed')
            const data= await response.json()
            if (data.error) {
                alert(data.error);
            } else {
                const tableBody=  document.querySelector('#expenseTable tbody');
                data.forEach(expense =>{
                    let row =document.createElement('tr');
    
                    const idCell =document.createElement('td');
                    idCell.textContent=expense.EXPENSE_ID;
                    row.appendChild(idCell)
    
                    const nameCell =document.createElement('td');
                    nameCell.textContent=expense.EXPENSE_NAME;
                    row.appendChild(nameCell)
    
                    const amountCell =document.createElement('td');
                    amountCell.textContent=expense.AMOUNT;
                    row.appendChild(amountCell)
    
                    const categoryCell =document.createElement('td');
                    categoryCell.textContent=expense.EXPENSE_CATEGORY;
                    row.appendChild(categoryCell)
    
                    const modeCell =document.createElement('td');
                    modeCell.textContent=expense.PAYMENT_MODE;
                    row.appendChild(modeCell)
    
                    const timeCell =document.createElement('td');
                    timeCell.textContent=expense.TIME;
                    row.appendChild(timeCell)
    
                    const descriptionCell =document.createElement('td');
                    descriptionCell.textContent=expense.DESCRIPTION;
                    descriptionCell.style.maxWidth='400px'
                    row.appendChild(descriptionCell)

                    const deleteCell=document.createElement('td')
                    const deleteButton=document.createElement('img');
                    deleteButton.src="images/del_icon.jpg"
                    deleteButton.width=30;
                    deleteButton.height=30;
                    deleteButton.style.cursor='pointer';
                    deleteButton.onclick=async function(){
                        const confirmDelete= confirm('Are you sure you want to delete this expense?')
                        if(confirmDelete){ 
                            try{
                                const expenseId = Number(expense.EXPENSE_ID); 
                                // console.log(expenseId)
                                const deleteResponse=await fetch(`http://localhost:2000/delete_expense/${expenseId}`, {
                                    method:'DELETE'
                                });
                                const deleteData= await deleteResponse.json();
                                if(deleteResponse.ok){                                    
                                    row.remove(); //remove the row from the table
                                    alert(deleteData.message);
                                }else{
                                    alert(deleteData.error || 'Failed to delete the expense');
                                }
                            } catch (error){
                                console.error('Error deleting the expense:', error);
                                alert('An error occurred. Please try again')
                            }
                        }
                        //write code to delete that particular expense based on its id
                    }
                    deleteCell.appendChild(deleteButton);
                    row.appendChild(deleteCell)

                    tableBody.append(row)
                    console.log(tableBody)
                })
            }
        
        }catch(error){
            console.error('Error fetching data:', error);
            alert('An error occurred. Please try again.');
            console.log(error)
        };
    }
    fetchExpenses()


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
