declare var require: any

// Try to require a file to check if it exists
export const checkImage = (path:string) => {
    try {
        return require('${path}');
    } catch (err) {
        return null;
    }
};