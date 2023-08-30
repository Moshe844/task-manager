document.addEventListener("DOMContentLoaded", () => {
    const errorDiv = document.getElementById("errorDiv");
    const createTaskBtn = document.getElementById("createTaskBtn");
    const taskModal = document.getElementById("taskModal");
    const closeModalBtn = document.querySelector(".close");
    const createTaskForm = document.getElementById("createTask");
    const cancelTaskForm = document.getElementById("cancelTask");
    const buttonUpdate = document.getElementById("updateButton");
    const taskName = document.getElementById("taskName");
    const taskDescription = document.getElementById("taskDescription");
    const taskStatus = document.getElementById("taskStatus");
    const signoutButton = document.querySelector(".signout-btn");
    const usernameElement = document.getElementById("usernameValue");
    const successModal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    const closeButton = document.querySelector(".closes");
    const myStatus = document.getElementById("status")
  
    const taskCreatorElement = document.getElementById("taskCreator");

    // Get the username from the taskCreator span element
    const username = taskCreatorElement.textContent;

    // const myStoredUsername = username;
    
   
    function displaySuccessMessage(message) {
        successMessage.textContent = message;
        successModal.style.display = "block";

        setTimeout(() => {
            successModal.style.display = "none";
            successMessage.textContent = "";
        }, 2000); // Hide after 3 seconds

        
    }

    closeButton.addEventListener("click", () => {
        successModal.style.display = "none"
    })

    

    const storedStatus = localStorage.getItem('taskStatus');
    if (storedStatus) {
        taskStatus.value = storedStatus;
    }

    const storedUsername = localStorage.getItem('enteredUsername');
   

    if(storedUsername) {
        usernameElement.textContent = storedUsername;
    }

   


      // Function to convert URLs to clickable links
    
    // ... (the rest of your existing code)

    
    signoutButton.addEventListener("click", () => {
        // Redirect to the index.html page
        window.location.href = "index.html";
    });
   

    // Call the function to update the username
   

    
    createTaskBtn.addEventListener("click", async () => {
        taskModal.style.display = "block";
      
       
      });
      


    closeModalBtn.addEventListener("click", () => {
        taskModal.style.display = "none";

        location.reload()
    });

    cancelTaskForm.addEventListener("click", () => {
        taskModal.style.display = "none";

        location.reload();
        
    });

    createTaskForm.addEventListener("click", () => {
        const name = taskName.value;
        const description = taskDescription.value;
        const status = taskStatus.value;

        if (!description) {
            errorDiv.textContent = "Description is required!";
    
            
            setTimeout(() => {
                errorDiv.textContent = "";
            }, 3000); 
    
            return;
        }

        if (!name) {
            errorDiv.textContent = "Task name is required!";
    
            
            setTimeout(() => {
                errorDiv.textContent = "";
            }, 3000); 
    
            return;
        }

        if (name.trim() !== "") {
            const task = {
                name: name,
                description: description,
                status: status,
                creator: storedUsername 
            };
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
    
            createNewTask(name, description, status);
             
            taskModal.style.display = "none";
            displaySuccessMessage("Task created successfully")
             
             
        }
    });


  
    
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        tasks.forEach(task => {
            createNewTask(task.name, task.description, task.status);
        });


       

        function updateTaskBox(taskBox) {

           
            const newStatus = taskStatus.value;
            const newDescription = taskDescription.value;

            const newColumn = document.getElementById(newStatus);

        
            if (newColumn) {
                newColumn.appendChild(taskBox);

                const taskDescriptionElement = taskBox.querySelector(".task-description");
                taskDescriptionElement.innerHTML = `<strong>Details:</strong> ${newDescription}`;
        
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const taskName = taskBox.getAttribute("data-name"); // Retrieve the task name
                const taskIndex = tasks.findIndex(task => task.name === taskName);
        
                if (taskIndex !== -1) {
                    tasks[taskIndex].status = newStatus;
                    tasks[taskIndex].description = newDescription;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
        
                taskModal.style.display = "none";
                displaySuccessMessage("Task updated successfully")
              
               
            }
        }
      
        

    function createNewTask(name, description, status) {
       
        const taskBox = document.createElement("div");
        taskBox.classList.add("task-box");
        taskBox.setAttribute("data-name", name);

        taskDescription.value = "";
        taskName.value = "";
     
      

        const taskNameElement = document.createElement("div");
        taskNameElement.classList.add("task-name");
        taskNameElement.textContent = "Task Name: " + name;

        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("task-description");
        descriptionElement.innerHTML = "<strong>Details:</strong> " + description;

       
       

       const creatorElement = document.createElement("p");
       creatorElement.classList.add("creator");
       creatorElement.textContent = "Created by: " + username ;
       console.log(username);
       creatorElement.style.display = "block"

       
       
      
        
        taskBox.appendChild(taskNameElement);
        taskBox.appendChild(descriptionElement);
        taskBox.appendChild(creatorElement)
        

       

      


        const buttonContainer = document.createElement("div");
        buttonContainer.style.textAlign = "right"; 

        const editButton = document.createElement("button");
        editButton.innerHTML = "&#9998;";
        editButton.classList.add("edit-button");
        editButton.title = "Edit Task";
        editButton.style.marginLeft = "auto"; 

        
       
        let taskBoxToUpdate
        editButton.addEventListener("click", () => {
            
           

          
                taskModal.style.display = "block";
                taskName.value = name;
                taskDescription.value = description;
                taskStatus.value = status;
                buttonUpdate.style.display = "block";
                createTaskForm.style.display = "none";
                taskBoxToUpdate = taskBox;

             

                
           
        });
        

        updateButton.addEventListener("click", () => {
            
            const newStatus = taskStatus[0].value;
            const newDescription = taskDescription.value;
            
            updateTaskBox(taskBoxToUpdate, newStatus, newDescription);
            taskModal.style.display = "none";
            taskDescription.value = "";
            taskName.value = "";

            // location.reload();
        });

        
        

        const previousTask = taskBox.parentElement;
           
            if ( previousTask === createTaskForm) {
               
                previousTask.removeChild(taskBox);
            }

           

            const viewButton = document.createElement("button");
                viewButton.innerHTML = "&#128065;";
                viewButton.classList.add("view-button");

                // Set the tooltip text
                viewButton.title = "View";

                viewButton.addEventListener("click", () => {
                    console.log("View button clicked for task:", name);
                
                    taskModal.style.display = "block";
                    taskName.value = name;
                    taskDescription.value = description;
                    cancelTaskForm.innerHTML = "Ok";
                    taskStatus.remove();
                    createTaskForm.remove();
                    myStatus.remove();
                
                   
                
                    // Rest of your existing code for viewing...
                });
            

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#128465;";
        deleteButton.classList.add("delete-button");
        deleteButton.title ="Delete Task";
        deleteButton.addEventListener("click", () => {
            const confirmationModal = document.getElementById("confirmationModal");
            confirmationModal.style.display = "block";
            taskDescription.value = "";
            taskName.value = "";
        
            const confirmDeleteBtn = document.getElementById("confirmDelete");
            const cancelDeleteBtn = document.getElementById("cancelDelete");
        
            confirmDeleteBtn.addEventListener("click", () => {
                // Remove the task from the DOM
                taskBox.remove();
        
                // Remove the task from localStorage
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const updatedTasks = tasks.filter(existingTask => existingTask.name !== name);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        
                confirmationModal.style.display = "none";
                displaySuccessMessage("Task Deleted successfully")
            });
        
            cancelDeleteBtn.addEventListener("click", () => {
                confirmationModal.style.display = "none";
            });
        });

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(viewButton)
        buttonContainer.appendChild(deleteButton)
        

        taskBox.appendChild(buttonContainer);

        taskBox.style.width = "420px"; 

        

        console.log("Status:", status);
        const column = document.getElementById(status);
        if (column) {
            column.appendChild(taskBox);
            
        } else {
            console.error("Invalid status:", status);
        }
        
       
        
       
    }
   
});
        
  

