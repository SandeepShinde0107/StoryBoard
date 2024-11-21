document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Fetch JSON data
      const response = await fetch('./data.json');
      const data = await response.json();
  
      // Populate content dynamically
      renderHeroSection(data);
      renderTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  });
  
  // Populate the Hero Section
  function renderHeroSection(data) {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroDescription = document.querySelector('.hero-content p');
    const heroCTA = document.querySelector('.hero-content .cta-button');
  
    heroTitle.textContent = data.title;
    heroDescription.textContent = data.short_description;
    heroCTA.href = '#tasks';
  }
  
  // Populate Tasks
  function renderTasks(tasks) {
    const taskContainer = document.querySelector('#task-container');
  
    tasks.forEach(task => {
      const taskCard = document.createElement('div');
      taskCard.classList.add('task-card');
  
      taskCard.innerHTML = `
        <h3>${task.task_title}</h3>
        <p>${task.task_description}</p>
        <div class="assets">
          ${task.assets
            .map(asset => {
              switch (asset.asset_content_type) {
                case 'video':
                  return `
                    <div class="asset">
                      <h4>${asset.asset_title}</h4>
                      <iframe src="${asset.asset_content}" frameborder="0"></iframe>
                    </div>`;
                case 'article':
                  return `
                    <div class="asset">
                      <h4>${asset.asset_title}</h4>
                      <a href="${asset.asset_content}" target="_blank">Read More</a>
                    </div>`;
                case 'image':
                  return `
                    <div class="asset">
                      <h4>${asset.asset_title}</h4>
                      <img src="${asset.asset_content}" alt="${asset.asset_title}">
                    </div>`;
                default:
                  return `<p>${asset.asset_description}</p>`;
              }
            })
            .join('')}
        </div>
      `;
  
      taskContainer.appendChild(taskCard);
    });
  }
  