import {ref, uploadBytes, getDownloadURL, getStorage} from "firebase/storage";
import {uuidv4} from "@firebase/util";

const storage = getStorage();
export async function upLoadImage(file: any) {
  const urlRef = ref(storage, `${file.name + uuidv4()}`);
  return uploadBytes(urlRef, file).then(async () => getDownloadURL(urlRef));
}
