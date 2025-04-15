
/**
 * Renders the index page with the specified title.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the rendering is complete.
 */
export async function index(req, res, next) {
    res.render('home', { title: 'Express' });
}

/* res.render('home', { title: 'Express' });
This renders a template named 'home' (EJS).
{ title: 'Express' } passes an object with a title property into the template, 
which can be used dynamically in the rendered page. */