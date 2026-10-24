const palettes = {
    retrieval: { background: "#f0f2f6", ink: "#35445f", soft: "#c8d0df", accent: "#4a68f5", blue: "#7c8cae" },
    medical: { background: "#f0f2f6", ink: "#35445f", soft: "#c8d0df", accent: "#4a68f5", blue: "#7c8cae" },
    tracking: { background: "#edf1f4", ink: "#354a55", soft: "#c2d0d3", accent: "#4a68f5", blue: "#718fa0" },
    ar: { background: "#f1f1ef", ink: "#4a5057", soft: "#cbd1d2", accent: "#4a68f5", blue: "#7d8fa0", green: "#83969e" },
    documents: { background: "#f1f3f4", ink: "#424d56", soft: "#cbd4d8", accent: "#4a68f5", blue: "#748ca1" },
    molecules: { background: "#eef2f3", ink: "#40545a", soft: "#bdc9cc", accent: "#4a68f5", blue: "#698f9d" }
};

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function drawGrid(ctx, width, height, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (let x = 34; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 30; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

function drawDocuments(ctx, palette, compact) {
    const height = compact ? 560 : 620;
    const width = 900;
    drawGrid(ctx, width, height, "rgba(35, 70, 56, 0.055)");

    const docs = compact ? [70, 240, 410] : [75, 235, 395];
    docs.forEach((x, index) => {
        roundRect(ctx, x, 145 + (index % 2) * 24, 112, 148, 7, "rgba(255,255,255,0.72)", "rgba(35,70,56,0.18)");
        for (let row = 0; row < 5; row += 1) {
            const lineY = 172 + (index % 2) * 24 + row * 18;
            ctx.fillStyle = row === 2 ? "rgba(197,83,53,0.48)" : "rgba(35,70,56,0.22)";
            ctx.fillRect(x + 16, lineY, row === 2 ? 68 : 78 - (row % 2) * 15, 5);
        }
    });

    ctx.strokeStyle = palette.blue;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(205, 270);
    ctx.bezierCurveTo(295, 340, 340, 120, 465, 225);
    ctx.bezierCurveTo(550, 305, 565, 350, 670, 265);
    ctx.stroke();

    [205, 465, 670].forEach((x, index) => {
        const y = [270, 225, 265][index];
        ctx.beginPath();
        ctx.arc(x, y, index === 1 ? 14 : 10, 0, Math.PI * 2);
        ctx.fillStyle = index === 1 ? palette.accent : palette.ink;
        ctx.fill();
    });

    roundRect(ctx, 670, 175, 160, 184, 8, "rgba(255,255,255,0.78)", "rgba(35,70,56,0.2)");
    ctx.fillStyle = palette.ink;
    ctx.fillRect(695, 206, 96, 8);
    ctx.fillStyle = "rgba(35,70,56,0.2)";
    ctx.fillRect(695, 232, 112, 6);
    ctx.fillRect(695, 252, 91, 6);
    ctx.fillStyle = "rgba(197,83,53,0.35)";
    ctx.fillRect(695, 283, 108, 26);
}

function drawEvidence(ctx, palette) {
    const width = 900;
    const height = 560;
    drawGrid(ctx, width, height, "rgba(53,74,61,0.055)");

    roundRect(ctx, 72, 58, 300, 444, 7, "rgba(255,255,255,0.76)", "rgba(53,74,61,0.22)");
    ctx.fillStyle = palette.ink;
    ctx.fillRect(100, 90, 180, 9);
    ctx.fillStyle = "rgba(53,74,61,0.22)";
    ctx.fillRect(100, 114, 236, 5);
    ctx.fillRect(100, 130, 218, 5);

    for (let index = 0; index < 14; index += 1) {
        const y = 170 + index * 19;
        const lineWidth = 232 - (index % 4) * 21;
        if ([3, 8, 11].includes(index)) {
            ctx.fillStyle = "rgba(197,83,53,0.28)";
            ctx.fillRect(96, y - 5, lineWidth + 12, 15);
        }
        ctx.fillStyle = "rgba(53,74,61,0.26)";
        ctx.fillRect(104, y, lineWidth, 5);
    }

    const sources = [
        { x: 482, y: 112, color: palette.blue },
        { x: 482, y: 278, color: palette.accent },
        { x: 482, y: 408, color: palette.ink }
    ];
    sources.forEach((source, index) => {
        roundRect(ctx, source.x, source.y, 155, 64, 5, "rgba(255,255,255,0.68)", "rgba(53,74,61,0.18)");
        ctx.fillStyle = source.color;
        ctx.fillRect(source.x + 18, source.y + 17, 74 + index * 9, 6);
        ctx.fillStyle = "rgba(53,74,61,0.21)";
        ctx.fillRect(source.x + 18, source.y + 34, 110, 5);
    });

    ctx.strokeStyle = "rgba(106,145,161,0.85)";
    ctx.lineWidth = 3;
    sources.forEach((source, index) => {
        ctx.beginPath();
        ctx.moveTo(372, [221, 316, 373][index]);
        ctx.bezierCurveTo(425, [221, 316, 373][index], 430, source.y + 32, source.x, source.y + 32);
        ctx.stroke();
    });

    roundRect(ctx, 686, 191, 164, 172, 8, "rgba(35,70,56,0.92)", null);
    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.fillRect(710, 224, 98, 7);
    ctx.fillStyle = "rgba(255,255,255,0.36)";
    ctx.fillRect(710, 250, 112, 5);
    ctx.fillRect(710, 268, 91, 5);
    ctx.fillStyle = "rgba(197,83,53,0.82)";
    ctx.fillRect(710, 300, 114, 25);
    ctx.strokeStyle = palette.blue;
    ctx.beginPath();
    ctx.moveTo(637, 310);
    ctx.lineTo(686, 277);
    ctx.stroke();
}

function drawTracking(ctx, palette) {
    const width = 900;
    const height = 560;
    ctx.fillStyle = "rgba(35,70,56,0.035)";
    ctx.fillRect(0, 0, width, height);
    drawGrid(ctx, width, height, "rgba(36,63,70,0.07)");

    const frames = [100, 355, 610];
    frames.forEach((x, frameIndex) => {
        roundRect(ctx, x, 95, 192, 330, 5, "rgba(255,255,255,0.6)", "rgba(36,63,70,0.22)");
        ctx.fillStyle = "rgba(106,145,161,0.16)";
        ctx.fillRect(x + 14, 112, 164, 292);
        const shifts = [0, 20, 39];
        const people = [
            [47 + shifts[frameIndex], 170],
            [114 - shifts[frameIndex] * 0.45, 205],
            [83 + shifts[frameIndex] * 0.25, 300]
        ];
        people.forEach(([px, py], personIndex) => {
            ctx.strokeStyle = personIndex === 1 ? palette.accent : palette.ink;
            ctx.lineWidth = 3;
            ctx.strokeRect(x + px, py, 34, 72);
            ctx.beginPath();
            ctx.arc(x + px + 17, py - 10, 10, 0, Math.PI * 2);
            ctx.fillStyle = personIndex === 1 ? palette.accent : palette.blue;
            ctx.fill();
        });
    });

    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(264, 220);
    ctx.bezierCurveTo(315, 195, 334, 235, 390, 212);
    ctx.bezierCurveTo(464, 180, 510, 210, 559, 198);
    ctx.stroke();
    [264, 390, 559].forEach((x, index) => {
        ctx.beginPath();
        ctx.arc(x, [220, 212, 198][index], 7, 0, Math.PI * 2);
        ctx.fillStyle = palette.accent;
        ctx.fill();
    });
}

function drawAR(ctx, palette) {
    const width = 900;
    const height = 560;
    drawGrid(ctx, width, height, "rgba(57,76,64,0.055)");

    ctx.strokeStyle = "rgba(57,76,64,0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(436, 286, 220, 165, -0.14, 0, Math.PI * 2);
    ctx.stroke();

    for (let ring = 0; ring < 7; ring += 1) {
        const rx = 62 + ring * 23;
        const ry = 45 + ring * 16;
        ctx.strokeStyle = `rgba(57,76,64,${0.08 + ring * 0.025})`;
        ctx.beginPath();
        ctx.ellipse(436, 286, rx, ry, -0.14, 0, Math.PI * 2);
        ctx.stroke();
    }

    for (let row = -4; row <= 4; row += 1) {
        for (let col = -6; col <= 6; col += 1) {
            const x = 436 + col * 29 + row * 7;
            const y = 286 + row * 27;
            if (((x - 436) / 215) ** 2 + ((y - 286) / 160) ** 2 > 1) continue;
            ctx.beginPath();
            ctx.arc(x, y, (row + col) % 5 === 0 ? 5 : 3, 0, Math.PI * 2);
            ctx.fillStyle = (row + col) % 6 === 0 ? palette.accent : palette.ink;
            ctx.fill();
        }
    }

    roundRect(ctx, 704, 110, 118, 132, 7, "rgba(255,255,255,0.7)", "rgba(57,76,64,0.18)");
    [0, 1, 2, 3].forEach((index) => {
        ctx.fillStyle = index === 1 ? palette.accent : palette.green;
        ctx.fillRect(726, 143 + index * 22, 72 - (index % 2) * 15, 6);
    });
    ctx.strokeStyle = palette.blue;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(705, 350);
    ctx.lineTo(822, 350);
    ctx.lineTo(822, 435);
    ctx.stroke();
    for (let index = 0; index < 8; index += 1) {
        const x = 710 + index * 15;
        const y = 397 - Math.sin(index * 0.8) * 26;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = palette.accent;
        ctx.fill();
    }
}

function drawMolecules(ctx, palette) {
    const width = 900;
    const height = 560;
    drawGrid(ctx, width, height, "rgba(41,69,75,0.055)");

    const structures = [
        { cx: 235, cy: 275, r: 88, phase: 0 },
        { cx: 515, cy: 250, r: 105, phase: 0.35 },
        { cx: 730, cy: 330, r: 74, phase: 0.12 }
    ];

    structures.forEach((structure, groupIndex) => {
        const points = [];
        const count = groupIndex === 1 ? 7 : 6;
        for (let index = 0; index < count; index += 1) {
            const angle = (Math.PI * 2 * index) / count + structure.phase;
            points.push([
                structure.cx + Math.cos(angle) * structure.r,
                structure.cy + Math.sin(angle) * structure.r * 0.8
            ]);
        }
        ctx.strokeStyle = "rgba(41,69,75,0.5)";
        ctx.lineWidth = 4;
        points.forEach((point, index) => {
            const next = points[(index + 1) % points.length];
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(next[0], next[1]);
            ctx.stroke();
        });
        points.forEach((point, index) => {
            ctx.beginPath();
            ctx.arc(point[0], point[1], index === groupIndex ? 12 : 9, 0, Math.PI * 2);
            ctx.fillStyle = index === groupIndex ? palette.accent : (index % 2 ? palette.blue : palette.ink);
            ctx.fill();
        });
    });

    ctx.fillStyle = "rgba(41,69,75,0.28)";
    [120, 165, 570, 615, 660, 820].forEach((x, index) => {
        const y = [120, 420, 110, 420, 120, 215][index];
        ctx.fillRect(x, y, 36 + (index % 2) * 18, 5);
    });
}

function paintVisual(canvas) {
    const visual = canvas.dataset.visual;
    const palette = palettes[visual] || palettes.retrieval;
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, bounds.width);
    const height = width * 0.625;

    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.scale(width / 900, height / 560);

    if (visual === "retrieval" || visual === "medical") {
        drawDocuments(ctx, palette, visual !== "retrieval");
    } else if (visual === "documents") {
        drawEvidence(ctx, palette);
    } else if (visual === "tracking") {
        drawTracking(ctx, palette);
    } else if (visual === "ar") {
        drawAR(ctx, palette);
    } else if (visual === "molecules") {
        drawMolecules(ctx, palette);
    }

    ctx.restore();
}

const canvases = [...document.querySelectorAll("canvas[data-visual]")];
let resizeFrame = 0;

function paintAll() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => canvases.forEach(paintVisual));
}

paintAll();
window.addEventListener("resize", paintAll, { passive: true });
