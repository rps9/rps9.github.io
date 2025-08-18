type Store = Storage;

function chooseStore(remember: boolean): Store {
	return remember ? window.localStorage : window.sessionStorage;
}

// "role" is only used for loading UI, any actual functionality must check JWT with server 
export function setAuth(token: string, role: string, expiresAt: number, remember = true) {
	const store = chooseStore(remember);
	store.setItem("auth.token", token);
    store.setItem("auth.exp", String(expiresAt));
	store.setItem("auth.role", role);
	store.setItem("auth.persist", remember ? "local" : "session");
}

export function getAuth() {
	const prefer = window.localStorage.getItem("auth.persist");
	const store: Store = prefer === "session" ? window.sessionStorage : window.localStorage;
	const token = store.getItem("auth.token");
	const role = store.getItem("auth.role");
    const exp = Number(store.getItem("auth.exp"));
	return token ? { token, role, exp } : null;
}

export function clearAuth() {
	window.localStorage.removeItem("auth.token");
	window.localStorage.removeItem("auth.role");
    window.localStorage.removeItem("auth.exp");
	window.localStorage.removeItem("auth.persist");
	window.sessionStorage.removeItem("auth.token");
	window.sessionStorage.removeItem("auth.role");
    window.sessionStorage.removeItem("auth.exp");
	window.sessionStorage.removeItem("auth.persist");
}

export function isExpired(): boolean {
	const auth = getAuth();
	if (!auth?.token) return true;
	return Date.now() / 1000 >= auth.exp;
}

export function authHeader(): Record<string, string> {
	const auth = getAuth();
	if (!auth || isExpired()) {
		clearAuth();
		return {};
	}
	return { Authorization: `Bearer ${auth.token}` };
}

export function isSignedIn(): boolean {
	const auth = getAuth();
	if (!auth || isExpired()) { clearAuth(); return false; }
	return true;
}