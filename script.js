document.addEventListener("DOMContentLoaded", function () {
    const tasks = document.querySelectorAll('.task');
    const inProgress = document.getElementById('inprogress');
    const todo = document.getElementById('todo')
    const done = document.getElementById('done');

    tasks.forEach(task => {
        task.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id)
            task.classList.add("is-dragging");
        });
    });

    inProgress.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    inProgress.addEventListener('drop', (e) => {
        const taskId = e.dataTransfer.getData('text/plain');
        const task = document.getElementById(taskId);
        e.target.append(task)
    });


    done.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    done.addEventListener('drop', (e) => {
        const taskId = e.dataTransfer.getData('text/plain');
        const task = document.getElementById(taskId);
        done.append(task);
    });

    todo.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    todo.addEventListener('drop', (e) => {
        const taskId = e.dataTransfer.getData('text/plain');
        const task = document.getElementById(taskId);
        todo.append(task);
    });

});