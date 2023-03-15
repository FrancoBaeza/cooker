export const sessionOptions = {
	password: process.env.COOKIE_PASSWORD as string,
	cookieName: "presentation_site_cookie",
	// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	cookieOptions: {
	  secure: process.env.NODE_ENV === "production",
	},
};