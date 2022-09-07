const { Prisma } = require("@prisma/client")

const getErrorCode = (error, model="field") => {
      
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        
        if (error.code === "P2002") {
            return { status: 409, data: { error: `A ${model} with the provided username already exists`}}
        } 
        else if (error.code === "P2025") {
            return { status: 404, data: { error: `A ${model}  with the provided id does not exists!` }}
        }

    }
    
    console.log(error.message);
    return { status: 500, data: { error:`Internal DB Error ${error.code}`}}

}

module.exports = {
    getErrorCode
}