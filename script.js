function getDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for "iPhone" or "iPod" in the user agent string
    if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iPhone";
    }

    // Check for "iPad" in the user agent string (older iPadOS)
    if (/iPad/.test(userAgent) && !window.MSStream) {
        return "iPad";
    }

    // Modern iPadOS detection (User Agent contains "Macintosh" and is touch-enabled)
    if (
        /Macintosh/.test(userAgent) &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    ) {
        return "iPad";
    }

    // Check for Android devices
    if (/Android/.test(userAgent)) {
        // Further check if it's an Android tablet (no "Mobile" keyword)
        if (!/mobile/i.test(userAgent)) {
            return "Android Tablet";
        }
        return "Android Phone";
    }

    // Other platforms
    if (/Windows Phone/.test(userAgent)) {
        return "Windows Phone";
    }

    return "unknown";
}

function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    let version = "";

    if (ua.includes("Firefox")) {
        browser = "Firefox";
        version = ua.match(/Firefox\/([\d.]+)/)[1];
    } else if (ua.includes("Edg")) {
        browser = "Microsoft Edge";
        version = ua.match(/Edg\/([\d.]+)/)[1];
    } else if (ua.includes("Chrome")) {
        browser = "Chrome";
        version = ua.match(/Chrome\/([\d.]+)/)[1];
    } else if (ua.includes("Safari")) {
        browser = "Safari";
        version = ua.match(/Version\/([\d.]+)/)?.[1] || "";
    }

    return `${browser} ${version}`;
}

function detectOS() {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) return "Windows";
    if (platform.includes("mac")) return "macOS";
    if (platform.includes("linux")) return "Linux";
    if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()))
        return "iOS";
    if (/android/.test(navigator.userAgent.toLowerCase())) return "Android";
    return "Unknown";
}

function isWebGLSupported() {
    try {
        const canvas = document.createElement("canvas");
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") ||
                canvas.getContext("experimental-webgl"))
        );
    } catch (e) {
        return false;
    }
}

function addRow(label, value) {
    const table = document.getElementById("infoTable");
    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    cell1.textContent = label;

    const cell2 = document.createElement("td");
    cell2.textContent = value;

    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
}

function loadInfo() {
    addRow("User Agent", navigator.userAgent);
    addRow("Device Type", getDeviceType());
    addRow("Browser", getBrowserInfo());
    addRow("Operating System", detectOS());
    addRow("Platform", navigator.platform);
    addRow("Language", navigator.language);
    addRow("Cookies Enabled", navigator.cookieEnabled);
    addRow("Online Status", navigator.onLine);
    addRow("Java Enabled", navigator.javaEnabled());
    addRow("Touch Support", "ontouchstart" in window);
    addRow("WebGL Supported", isWebGLSupported());
    addRow("LocalStorage Supported", typeof Storage !== "undefined");
    addRow(
        "Dark Mode Preferred",
        window.matchMedia("(prefers-color-scheme: dark)").matches,
    );

    addRow("Screen Resolution", `${screen.width} x ${screen.height}`);
    addRow("Viewport Size", `${window.innerWidth} x ${window.innerHeight}`);
}

function handleCarChange(event) {
    alert(`Selected: ${event.target.value}`);
}

loadInfo();

window.addEventListener("resize", () => {
    location.reload();
});
