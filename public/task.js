const API_URL = "https://task-manager-solution.onrender.com";
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
    // const usernameElement = document.getElementById("usernameValue");
    const successModal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    const closeButton = document.querySelector(".closes");
    const myStatus = document.getElementById("status")
    const trackPrButton = document.getElementById("trackPrRequests");
    const modal = document.getElementById("ourModal");
    const ourCloseButton = document.getElementsByClassName("closebtn")[0];
    const cancelButton = document.getElementById("cancelBtn");

    function buildHTML(urls) {
        const urlsDiv = document.createElement("div");
        const urlsContent = urls
          .map((url) => {
            if (url.trim().startsWith("http")) {
              return `<a href="${url.trim()}" target="_blank">${url.trim()}</a><br>`;
            } else {
              return `${url}<br>`;
            }
          })
          .join("");
        urlsDiv.innerHTML = urlsContent;
        document.querySelector(".url-input").prepend(urlsDiv); // I am prepending to body just to show you that you need to inject the tags in the html. You put it on your desired place.
      }
      const loadURLs = async () => {
        try {
          const response = await fetch(`${API_URL}/urls`);
          const urls = await response.json();
          console.log(urls);
          // You can create a function to build the html with the urls info and invoke it.
          buildHTML(urls);
        } catch (err) {
          console.error(`Failed to load URLs. ${err}`);
        }
      };
      loadURLs();
      document.getElementById("saveBtn").addEventListener("click", function () {
        const urlInput = document.querySelector(".url-input");
        const urls = urlInput.innerText.split("\n").filter(Boolean);
        const formattedUrls = urls.map((url) => {
          if (url.trim().startsWith("http")) {
            return `<a href="${url.trim()}" target="_blank">${url.trim()}</a>`;
          } else {
            return url;
          }
        });
        urlInput.innerHTML = formattedUrls.join("<br>");
        modal.style.display = "none";
        const links = urlInput.querySelectorAll("a");
        links.forEach((link) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            window.open(this.href, "_blank");
          });
        });
        // Send the URLs to the server
        fetch("http://localhost:4000/urls", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `url=${encodeURIComponent(urls.join("\n"))}`,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            loadURLs();
            return response.text(); // This will be 'URL saved successfully!'
          })
          .catch((error) => console.error("Error:", error));
      });
    
  trackPrButton.onclick = function() {
    modal.style.display = "block";
  }

  ourCloseButton.onclick = function() {
    modal.style.display = "none";
  }

  cancelButton.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

   
 
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

    


    function getQueryParam(parameterName) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(parameterName);
      }
      
      // Get the username from the query parameter
      const username = getQueryParam('username');
      const fullNameParams = getQueryParam('fullName');
      
      // Update the usernameValue element with the retrieved username
      const usernameValue = document.getElementById('usernameValue');
      if (username) {
        usernameValue.textContent = username;
      } else {
        usernameValue.textContent = 'Unknown';
      }
      
      // Display the full name in the "creator" paragraph
      const taskCreator = document.getElementById('taskCreator');
      if (fullNameParams) {
        taskCreator.textContent = "Created by: " + fullNameParams;
      } else {
        taskCreator.textContent = 'Created by: Unknown';
      }

      const taskEditor = document.getElementById("taskEditor");
      if(fullNameParams){
        taskEditor.textContent = "Edited by: " + fullNameParams;
      }else {
        taskEditor.textContent = 'Edited by: Unknown';
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

    // closingModalBtn.addEventListener('click', () => {
    //     modal.style.display = 'none'; // Hide the modal
    // });

    // confirmModal.addEventListener('click', () => {
    //     modal.style.display = 'none'; // Hide the modal
    //     // Proceed with editing logic here
    // });

    createTaskForm.addEventListener("click", async () => {
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

       
    const taskData = {
        name: name,
        description: description,
        status: status,
        username: username,
        fullName: fullNameParams,
        // editor: fullNameParams
      };
  
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });
    
        if (response.ok) {
            const createdTask = await response.json(); // Parse the response JSON
            taskModal.style.display = "none";
            displaySuccessMessage("Task created successfully")
            console.log("Created task", await createdTask);
           
            createNewTask(createdTask.task.name, createdTask.task.description, createdTask.task.status, createdTask.task.fullName, createdTask.task.editor); // Add the new task to the UI
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    });


  
    
    async function loadTasks() {
        try {
          const response = await fetch(`${API_URL}/tasks`);
          if (response.ok) {
            
            const tasks = await response.json();
            tasks.forEach(task => {
              createNewTask(task.name, task.description, task.status, task.fullName, task.editor);
              
            });
          } else {
            // Handle error
          }
        } catch (error) {
          console.error('Error loading tasks:', error);
        }
      }
    
      loadTasks();


       

      function updateTaskInUI(taskName, newStatus, newDescription, editor) {
        // console.log(editor);
        const taskBoxToUpdate = document.querySelector(`[data-name="${taskName}"]`);
            
        if (taskBoxToUpdate) {
            const taskDescriptionElement = taskBoxToUpdate.querySelector(".task-description");
            const taskEditorElement = taskBoxToUpdate.querySelector(".editor");
            // const taskStatusElement = taskBoxToUpdate.querySelector(".task-status");
            // console.log("Status:", newStatus);
            const column = document.getElementById(newStatus);
            if (column) {
                column.appendChild(taskBoxToUpdate);
                
            } else {
                console.error("Invalid status:", newStatus);
            }
            if (taskDescriptionElement) {
                
                taskDescriptionElement.innerHTML = `<strong>Details:</strong> ${newDescription}`;
              
            }

            if(taskEditorElement) {
                taskEditorElement.textContent = "Edited by: " + editor ;
            }
        }
    }
    
    // Function to update a task on the server
    async function updateTaskOnServer(taskName, newStatus, newDescription, editor, editedDate) {
        try {
            const response = await fetch(`/tasks/${taskName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                    description: newDescription,
                    editor: fullNameParams,
                    editedDate: editedDate
                    
                }),
            });
    
            if (response.ok) {
                
                var {description, name, status, editor} = await response.json();
                // console.log(response.body);
                console.log(description, name, status, editor, editedDate);
                updateTaskInUI(name, status, description, editor, editedDate);
                location.reload()
                taskModal.style.display = "none";
                displaySuccessMessage("Task updated successfully");
            } else {
                throw new Error('Failed to update task on the server');
            }
        } catch (error) {
            console.error(error);
        }
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
    
    
    function createNewTask(name, description, status, fullName, editor) {
        const formattedDate = formatDate(new Date()); 
        
       console.log(editor);
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
       creatorElement.textContent = "Created by: " + fullName ;
      
       creatorElement.style.display = "block"

       
    //    const editedByElement = document.createElement("p");
    //     editedByElement.classList.add("editor");
    //     editedByElement.textContent = "Edited by: " + fullNameParams;
    //     console.log(fullName);
    //     editedByElement.style.display = "none"
      
        
        taskBox.appendChild(taskNameElement);
        taskBox.appendChild(descriptionElement);
        taskBox.appendChild(creatorElement)
        // taskBox.appendChild(editedByElement)
        
       
        if (editor !== null) {
            console.log(editor, fullName);
            const editedByElement = document.createElement("p");
            editedByElement.classList.add("editor");
            editedByElement.textContent = "Edited by: " + editor + " on " + formattedDate ;
            editedByElement.style.display = "block"
            taskBox.appendChild(editedByElement);
          }

        //   console.log("Created task:", name, description, status, username);


        const buttonContainer = document.createElement("div");
        buttonContainer.style.textAlign = "right"; 

        const editButton = document.createElement("button");
        editButton.innerHTML = "&#9998;";
        editButton.classList.add("edit-button");
        editButton.title = "Edit Task";
        editButton.style.marginLeft = "auto"; 

        
       
        let taskBoxToUpdate = null;
        editButton.addEventListener("click", () => {
            taskBoxToUpdate = taskBox;
                        taskModal.style.display = "block";
                        taskName.value = name;
                        taskDescription.value = description;
                        taskStatus.value = status;
                        buttonUpdate.style.display = "block";
                        createTaskForm.style.display = "none";
            if (fullNameParams !== fullName) {
                 taskModal.style.display = "none"
                Swal.fire({
                    title: "Confirmation",
                    text: "You are about to edit someone else's task. Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, Proceed",
                    cancelButtonText: "Cancel",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // User clicked "Yes, Proceed," proceed with the edit
                        taskBoxToUpdate = taskBox;
                        taskModal.style.display = "block";
                        taskName.value = name;
                        taskDescription.value = description;
                        taskStatus.value = status;
                        buttonUpdate.style.display = "block";
                        createTaskForm.style.display = "none";
                    } else {
                        taskModal.style.display = "none"
                    }
                });
            }
        });
        updateButton.addEventListener("click", () => {
            const newStatus = taskStatus.value;
            const newDescription = taskDescription.value;
           
        
           
            if (taskBoxToUpdate) {
              
                const taskNameToUpdate = taskBoxToUpdate.getAttribute("data-name");
        
                if (taskNameToUpdate) {
                    updateTaskOnServer(taskNameToUpdate, newStatus, newDescription, fullNameParams);
                    taskName.value = "";
                    taskDescription.value = "";

                    const editedByElement = taskBoxToUpdate.querySelector('.editor');
            if (editedByElement) {
                const now = new Date();
                const formattedDate = formatDate(now);
                editedByElement.style.display = "block";
                editedByElement.textContent = "Edited by " + fullNameParams + " on " + formattedDate;
            }
                }
            } else {
                console.error("taskBoxToUpdate is null. Make sure the 'Edit Task' button was clicked before updating.");
            }
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
        
            confirmDeleteBtn.addEventListener("click", async () => {
                // Make an HTTP DELETE request to the server to delete the task
                try {
                    const response = await fetch(`/tasks/${name}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
        
                    if (response.ok) {
                        // Remove the task from the DOM
                        taskBox.remove();
                        displaySuccessMessage("Task Deleted successfully");
                    } else {
                        console.error("Error deleting task:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error deleting task:", error);
                }
        
                confirmationModal.style.display = "none";
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

        

        // console.log("Status:", status);
        const column = document.getElementById(status);
        if (column) {
            column.appendChild(taskBox);
            
        } else {
            console.error("Invalid status:", status);
        }
        
       
        }
   
});

        
  

