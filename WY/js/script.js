// js/script.js

// 等待 DOM 完全加载
document.addEventListener('DOMContentLoaded', () => {
    // 给每个 section 添加 animate-in 类，并设置延迟
    const sections = document.querySelectorAll('main section');
    sections.forEach((section, index) => {
        // 使用 setTimeout 给每个 section 设置一个递增的延迟
        // 这样它们就会一个接一个地出现，而不是同时出现
        setTimeout(() => {
            section.classList.add('animate-in');
        }, index * 100); // 每个 section 延迟 100ms
    });

    // 你之前可能已经在这里或其他地方有代码了，请保留它们
    // 例如，处理导航 active 状态的代码等等
    // 示例：处理导航链接 active 状态（如果之前没写的话）
     const currentPath = window.location.pathname;
     const navLinks = document.querySelectorAll('header nav ul li a');
     navLinks.forEach(link => {
         // 简化比较，检查链接的 href 是否包含当前路径的部分
         // 注意：对于 index.html，需要特殊处理或确保链接是 '/' 或 'index.html'
         if (link.href.includes(currentPath) || (currentPath === '/' && link.href.endsWith('index.html'))) {
             link.classList.add('active');
         } else {
             link.classList.remove('active'); // 移除其他链接的 active 类
         }
     });
});

// 你可能还有其他的 JavaScript 函数或事件监听器，请保留它们
// js/script.js



document.addEventListener('DOMContentLoaded', () => {
    // ... (之前的页面加载动画和导航 active 类代码) ...

    // --- 点赞功能 - 基于本地存储 ---
    const likeButtons = document.querySelectorAll('.like-button');

    // 从 localStorage 加载所有项目的点赞数据
    const allItemLikesData = JSON.parse(localStorage.getItem('allItemLikes') || '{}');

    likeButtons.forEach(button => {
        // 获取点赞对象的唯一ID，例如 'ai-case-edu', 'youth-story-lihua'
        const itemId = button.parentElement.dataset.itemId;
        if (!itemId) {
            console.warn('点赞按钮缺少 data-item-id 属性或父元素结构不对:', button);
            return; // 如果没有ID，跳过
        }

        // 获取当前项目的点赞数据，如果不存在则初始化
        const itemLikes = allItemLikesData[itemId] || { count: 0, liked: false };

        // 更新页面显示
        const likeCountSpan = button.querySelector('.like-count');
        const likeIcon = button.querySelector('i');

        likeCountSpan.textContent = itemLikes.count;
        if (itemLikes.liked) {
            button.classList.add('liked');
             // 假设 Font Awesome 初始图标是 far fa-thumbs-up (空心)
             likeIcon.classList.remove('far');
             likeIcon.classList.add('fas'); // Font Awesome 实心赞图标
        } else {
             button.classList.remove('liked');
             likeIcon.classList.remove('fas');
             likeIcon.classList.add('far');
        }

        // 添加点击事件监听器
        button.addEventListener('click', () => {
            // 在基于本地存储的简单实现中，通常只允许点赞一次
            if (itemLikes.liked) {
                console.log(`Item ${itemId} already liked.`);
                // 如果想实现取消点赞功能，可以在这里添加逻辑：
                // itemLikes.count--;
                // itemLikes.liked = false;
                // button.classList.remove('liked');
                // likeIcon.classList.remove('fas');
                // likeIcon.classList.add('far');
                // likeCountSpan.textContent = itemLikes.count;
                // Update localStorage
                // allItemLikesData[itemId] = itemLikes;
                // localStorage.setItem('allItemLikes', JSON.stringify(allItemLikesData));
                return; // 不执行点赞操作
            }

            // 执行点赞操作
            itemLikes.count++;
            itemLikes.liked = true; // 标记用户已点赞

            // 更新页面显示
            likeCountSpan.textContent = itemLikes.count;
            button.classList.add('liked');
             likeIcon.classList.remove('far');
             likeIcon.classList.add('fas');


            // 将更新后的所有项目点赞数据存回 localStorage
            allItemLikesData[itemId] = itemLikes;
            localStorage.setItem('allItemLikes', JSON.stringify(allItemLikesData));

            console.log(`Item ${itemId} liked. Current count: ${itemLikes.count}`);
        });
    });


    // --- (其他可能的 JS 代码，例如移动端导航切换等) ---
});

// 如果您有其他的 JS 函数，请放在这个监听器外部
// js/script.js

// 函数用于加载并初始化 Gitalk 评论系统
function loadGitalkComments() {
    const gitalkContainer = document.getElementById('gitalk-container');
    const loadPrompt = document.getElementById('load-comments-prompt');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (!gitalkContainer || gitalkContainer.dataset.loaded) {
         // 如果容器不存在或已经加载过，则不执行
         return;
    }

    // 标记为已开始加载，避免重复操作
    gitalkContainer.dataset.loaded = 'true';

    // 显示加载指示器，隐藏提示
    if (loadPrompt) loadPrompt.style.display = 'none';
    if (loadingIndicator) loadingIndicator.style.display = 'block';


    // 1. 动态加载 Gitalk CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
    document.head.appendChild(link);

    // 2. 动态加载 Gitalk JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';

    script.onload = () => {
        // Gitalk JS 加载完成后，执行初始化
        const gitalk = new Gitalk({
             clientID: 'YOUR_GITHUB_CLIENT_ID', // **重要：替换为您的 Client ID**
             clientSecret: 'YOUR_GITHUB_CLIENT_SECRET', // **重要：替换为您的 Client Secret**
             repo: 'YOUR_GITHUB_REPO_NAME_FOR_COMMENTS', // **重要：替换为您创建的评论仓库名**
             owner: 'YOUR_GITHUB_USERNAME', // **重要：替换为您的 GitHub 用户名**
             admin: ['YOUR_GITHUB_USERNAME'], // **重要：替换为您的 GitHub 用户名 (管理员)**
             id: location.pathname, // 页面的唯一标识符
             distractionFreeMode: false
        });

        gitalk.render('gitalk-container'); // 渲染评论区

        // 隐藏加载指示器
         if (loadingIndicator) loadingIndicator.style.display = 'none';

         console.log('Gitalk comments loaded and initialized.');
    };

    script.onerror = () => {
        // 加载失败处理
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        if (loadPrompt) {
            loadPrompt.style.display = 'block'; // 重新显示提示
            loadPrompt.textContent = '评论加载失败，请重试或检查网络。';
            loadPrompt.style.color = 'red';
            loadPrompt.style.cursor = 'default';
        }
        gitalkContainer.dataset.loaded = 'error'; // 标记加载失败
         console.error('Failed to load Gitalk script.');
    };

    document.body.appendChild(script); // 将脚本添加到 body 底部
}

// --- 触发加载评论的逻辑 ---

// 方案 A: 点击按钮/提示加载 (更直接)
 const loadCommentsPrompt = document.getElementById('load-comments-prompt');
 if (loadCommentsPrompt) {
     loadCommentsPrompt.addEventListener('click', loadGitalkComments);
 }


// 方案 B: 滚动到评论区时自动加载 (更平滑的用户体验，但代码稍复杂)
// 您可以选择其中一种方案
/*
const gitalkContainer = document.getElementById('gitalk-container');
if (gitalkContainer) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 当目标元素（评论容器）进入视口时
            if (entry.isIntersecting) {
                loadGitalkComments(); // 加载评论
                observer.unobserve(entry.target); // 停止观察，避免重复加载
            }
        });
    }, {
        rootMargin: '0px', // 当容器完全进入视口时触发
        threshold: 0.1 // 容器的 10% 进入视口时触发
    });

    observer.observe(gitalkContainer); // 开始观察评论容器
}
*/


// --- (其他现有的 JS 代码，例如页面加载动画、导航 active 类、点赞功能等) ---

// 点赞功能代码保持不变
// ... (您的点赞功能代码) ...