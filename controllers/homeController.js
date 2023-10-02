

const termsPage = (req, res) => {
    res.render('home/terms', {
        title: 'Terms and Conditions'
    });
}

export {
    termsPage
}