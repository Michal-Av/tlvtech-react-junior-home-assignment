/**
 * This file handles all the communication with the server.
 * The different endpoints are described in server.js.
 */
const apiUrl = 'http://localhost:3000';

export async function getGames() {
  const resp = await fetch(`${apiUrl}/game`);
  return await resp.json();
}

export async function deleteGame(gameId) {
  const resp = await fetch(`${apiUrl}/game/${gameId}`, { method: 'DELETE' });
  return await resp.json();
}

export async function addGames(gameObj) {
  const resp = await fetch(`${apiUrl}/game`, { method: 'POST', headers: {
    "Content-Type": "application/json",
    Accept: "application/json; charset=utf-8"
  },
  body: JSON.stringify(gameObj) });
  return await resp.json();
}

export async function editGame(gameId, gameObj) {
  const resp = await fetch(`${apiUrl}/game/${gameId}`, { method: 'PUT', headers: {
    "Content-Type": "application/json",
    Accept: "application/json; charset=utf-8"
  },
   body: JSON.stringify(gameObj) });
  return await resp.json();
}

