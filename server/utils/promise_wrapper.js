/**
 * Wraps a function that follows the Node.js callback pattern into a Promise.
 *
 * @param {function} wrapped - The function to be wrapped.
 * @param {object} info - The information to be passed to the wrapped function.
 * @param {object=} [extras] - Additional parameters to be passed to the wrapped function.
 * @returns {Promise<any>} A Promise that resolves with the result of the wrapped function or rejects with an error.
 */
export default function PromiseWrapper (wrapped, info, extras = null) {
  return new Promise((resolve, reject) => {
    wrapped(info, extras, (error, result = null) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}
