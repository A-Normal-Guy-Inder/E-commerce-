/* Session cookie settings */

const isProduction = process.env.NODE_ENV === "production";

const COOKIE_NAME = process.env.COOKIE_NAME || "token";

/* Matches JWT expiry */
const MAX_AGE_MS = 60 * 60 * 1000;

/* Cross-site needs None+Secure */
function baseOptions() {
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
    };
}

function setOptions() {
    return { ...baseOptions(), maxAge: MAX_AGE_MS };
}

/* Flags must match */
function clearOptions() {
    return baseOptions();
}

module.exports = { COOKIE_NAME, MAX_AGE_MS, setOptions, clearOptions, isProduction };
