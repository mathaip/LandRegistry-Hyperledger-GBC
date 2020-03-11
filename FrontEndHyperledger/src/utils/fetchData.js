export default async function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(
      result =>
        new Promise(resolve => {
          // setTimeout(() => resolve(result), 3000)
          resolve(result)
        }),
    )
}
