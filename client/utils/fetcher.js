// Get planets
export async function getPlanets () {
  const response = await fetch('./planets')
  return await response.json()
}

// Get systems
export async function getSystems () {
  const response = await fetch('./systems')
  return await response.json()
}

// Add a planet
export async function addPlanet (planet) {
  if (typeof planet === 'object') {
    planet = JSON.stringify(planet)
  }

  const response = await fetch('./planets', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: planet
  })
  return await response.json()
}

// Add a system
export async function addSystem (system) {
  if (typeof system === 'object') {
    system = JSON.stringify(system)
  }

  const response = await fetch('./systems', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: system
  })
  return await response.json()
}

// Update a planet
export async function updatePlanet (planet) {
  if (typeof planet === 'object') {
    planet = JSON.stringify(planet)
  }

  const response = await fetch('./planets/edit', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: planet
  })
  return await response.json()
}

// Update a system
export async function updateSystem (system) {
  if (typeof system === 'object') {
    system = JSON.stringify(system)
  }

  const response = await fetch('./systems/edit', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: system
  })
  return await response.json()
}

// Delete a planet
export async function deletePlanet (id) {
  const response = await fetch(`./planets/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

// Delete a system
export async function deleteSystem (id) {
  const response = await fetch(`./systems/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
