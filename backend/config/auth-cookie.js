/* Single source of truth for the session cookie. */

const isProduction = process.env.NODE_ENV === "production";

const COOKIE_NAME = process.env.COOKIE_NAME || "token";

/* Matches the JWT expiry in auth-handler (1h) */
const MAX_AGE_MS = 60 * 60 * 1000;

/*
 * The webapp and this API are served from different domains, so the session
 * cookie is cross-site. Browsers only accept a cross-site cookie when it is
 * SameSite=None AND Secure — but Secure cookies are never sent over plain
 * http://localhost, so development has to stay on Lax.
 */
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

/* clearCookie only matches when the flags match the ones used to set it */
function clearOptions() {
    return baseOptions();
}

module.exports = { COOKIE_NAME, MAX_AGE_MS, setOptions, clearOptions, isProduction };
