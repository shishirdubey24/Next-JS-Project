import {SignJWT} from "jose";
const SECRET_KEY=new TextEncoder().encode(
    process.env.JWT_SECRET
);
export const generateAuthToken = async (data: { userId: string }) => {
    const res= await new SignJWT(data)
    .setProtectedHeader({alg:'HS256'})
     .setIssuedAt()
    .setExpirationTime('2d')
    .sign(SECRET_KEY)

    return res
}
