import PromiseWrapper from './promise_wrapper.js'

export async function validateBase (submission, editing, callback) {
  try {
    await PromiseWrapper(checkShape, submission, { checkID: editing })
  }
  catch (err) {
    callback(err)
    return
  }

  const cleanedBase = {}
  if (editing) {
    cleanedBase._id = submission._id
  }

  if (!submission.name) {
    callback({ status: 400, message: 'Base must have a name' })
    return
  }
  cleanedBase.name = submission.name

  if (!submission.planet) {
    callback({ status: 400, message: 'Base must be on a planet' })
    return
  }
  cleanedBase.planet = submission.planet

  if (!submission.system) {
    callback({ status: 400, message: 'Base must be in a system' })
    return
  }
  cleanedBase.system = submission.system

  cleanedBase.notes = submission.notes?.trim() ?? ''

  callback(null, cleanedBase)
}

/**
 * Checks the shape of a base submission.
 *
 * @param {object} submission - The base submission to be checked.
 * @param {object} extras - Additional options for the validation.
 * @param {boolean} extras.checkID - Flag indicating whether to check the ID.
 * @param {function} callback - The callback function to be called after the validation.
 * @returns {void}
 */
function checkShape (submission, extras, callback) {
  const { checkID } = extras

  if (!submission) {
    callback({ status: 400, message: 'No base provided' })
    return
  }
  if (typeof submission !== 'object' || Array.isArray(submission)) {
    callback({ status: 400, message: 'Invalid base' })
    return
  }
  if (checkID && !submission._id) {
    callback({ status: 400, message: 'No base ID provided' })
    return
  }

  callback(null)
}
