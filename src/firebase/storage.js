import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

// 'file' comes from the Blob or File API
export const uploadFileToFirebaseStorage = async (file, folderName, fileName) => {

    //const storage = getStorage();


    const storageRef = ref(storage, `${folderName}/${fileName}`);


    let fileUrl = null;

    await uploadBytes(storageRef, file).then(async (snapshot) => {
        console.log('Uploaded a blob or file!');
        await getDownloadURL(storageRef).then((url) => {
            console.log('Uploaded a blob or file! URL:', url);
            fileUrl = url;
        });
    });

    return {url: fileUrl}
}
