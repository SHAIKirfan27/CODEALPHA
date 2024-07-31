document.addEventListener('DOMContentLoaded', () => {
    const createProjectButton = document.getElementById('createProject');
    const projectNameInput = document.getElementById('projectName');
    const projectList = document.getElementById('projectList');
  
    let projects = [];
  
    function renderProjects() {
      projectList.innerHTML = '';
      projects.forEach((project, projectIndex) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
          <h3>${project.name}</h3>
          <div class="task-form">
            <input type="text" placeholder="New Task">
            <button onclick="addTask(${projectIndex})">Add Task</button>
          </div>
          <div class="task-list" id="tasks-${projectIndex}"></div>
        `;
        projectList.appendChild(projectDiv);
  
        const taskList = document.getElementById(`tasks-${projectIndex}`);
        project.tasks.forEach((task, taskIndex) => {
          const taskDiv = document.createElement('div');
          taskDiv.classList.add('task');
          taskDiv.innerHTML = `
            <strong>${task.name}</strong>
            <div class="comment-list" id="comments-${projectIndex}-${taskIndex}"></div>
            <div class="comment-form">
              <input type="text" placeholder="Add a comment">
              <button onclick="addComment(${projectIndex}, ${taskIndex})">Comment</button>
            </div>
          `;
          taskList.appendChild(taskDiv);
  
          const commentList = document.getElementById(`comments-${projectIndex}-${taskIndex}`);
          task.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.textContent = comment;
            commentList.appendChild(commentDiv);
          });
        });
      });
    }
  
    window.addTask = (projectIndex) => {
      const taskInput = projectList.querySelectorAll('.task-form input')[projectIndex];
      const taskName = taskInput.value.trim();
      if (taskName) {
        projects[projectIndex].tasks.push({
          name: taskName,
          comments: []
        });
        taskInput.value = '';
        renderProjects();
      }
    };
  
    window.addComment = (projectIndex, taskIndex) => {
      const commentInput = projectList.querySelectorAll('.comment-form input')[projectIndex];
      const commentText = commentInput.value.trim();
      if (commentText) {
        projects[projectIndex].tasks[taskIndex].comments.push(commentText);
        commentInput.value = '';
        renderProjects();
      }
    };
  
    createProjectButton.addEventListener('click', () => {
      const projectName = projectNameInput.value.trim();
      if (projectName) {
        projects.push({
          name: projectName,
          tasks: []
        });
        projectNameInput.value = '';
        renderProjects();
      }
    });
  });
  
