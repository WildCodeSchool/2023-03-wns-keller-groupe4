// Verify if the image provided is a valid base64 image
export const verifyBase64Image = async (base64String: string) => {
    let image = new Image();
    image.src = base64String;
    return await new Promise((resolve) => {
        image.onload = () => {
            if (image.height === 0 || image.width === 0) {
                resolve(false);
                return;
            }
            resolve(true);
        };
        image.onerror = () => {
            resolve(false);
        };
    });
};

export default verifyBase64Image;
