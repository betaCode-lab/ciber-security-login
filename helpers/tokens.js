import jwt from 'jsonwebtoken'

const generateToken = (data) => {
    return jwt.sign(
        { id: data.id, email: data.email }, 
        "JkmIu58xUm.", 
        { expiresIn: '1h' }
    )
};

export {
    generateToken
}