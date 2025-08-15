type Store = Storage;

function chooseStore(remember: boolean): Store {
	return remember ? window.localStorage : window.sessionStorage;
}

export function setAuth(token: string, role: string, remember = true) {
	const store = chooseStore(remember);
	store.setItem("auth.token", token);
	store.setItem("auth.role", role);
	store.setItem("auth.persist", remember ? "local" : "session");
}

export function getAuth() {
	const prefer = window.localStorage.getItem("auth.persist");
	const store: Store = prefer === "session" ? window.sessionStorage : window.localStorage;
	const token = store.getItem("auth.token");
	const role = store.getItem("auth.role");
	return token ? { token, role } : null;
}

export function clearAuth() {
	window.localStorage.removeItem("auth.token");
	window.localStorage.removeItem("auth.role");
	window.localStorage.removeItem("auth.persist");
	window.sessionStorage.removeItem("auth.token");
	window.sessionStorage.removeItem("auth.role");
	window.sessionStorage.removeItem("auth.persist");
}

export function authHeader() {
	const auth = getAuth();
	return auth ? { Authorization: `Bearer ${auth.token}` } : {};
}
