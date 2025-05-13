(function() {
    // 创建Canvas元素
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置基础样式
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        zIndex: '9999'
    });

    // 初始化参数
    let mouseX = 0, mouseY = 0;
    const trailConfig = {
        maxTrails: 50,
        trailSpeed: 0.9,
        baseWidth: 2
    };

    let trails = [];
    for(let i = 0; i < trailConfig.maxTrails; i++) {
        trails.push({ x: 0, y: 0 });
    }

    // 初始化Canvas尺寸
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        updatePosition();
    }

    // 更新Canvas位置
    function updatePosition() {
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
    }

    // 更新拖尾效果
    function updateTrails() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let lastPos = { x: mouseX, y: mouseY };
        for(let i = 0; i < trails.length; i++) {
            const trail = trails[i];
            const distance = Math.hypot(lastPos.x - trail.x, lastPos.y - trail.y);
            
            // // 动态计算线宽（基于距离）
            // const lineWidth = Math.max(
            //     trailConfig.baseWidth,
            //     distance / 10
            // );
            const lineWidth = trailConfig.baseWidth;

            ctx.beginPath();
            // ctx.strokeStyle = `hsl(${i * 7}, 100%, 50%)`; // 彩虹色渐变
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - i / trails.length})`;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            
            // 缓动运动
            trail.x += (lastPos.x - trail.x) * trailConfig.trailSpeed;
            trail.y += (lastPos.y - trail.y) * trailConfig.trailSpeed;
            
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(trail.x, trail.y);
            ctx.stroke();
            
            lastPos = { x: trail.x, y: trail.y };
        }
        requestAnimationFrame(updateTrails);
    }

    // 事件监听
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
        initCanvas();
        updatePosition();
    });

    // 初始化
    document.body.appendChild(canvas);
    initCanvas();
    updateTrails();
})();