import { uploadImage } from "../api/user";

const UploadAndDisplayImage = ({
  setImageId,
  selectedImage,
  setSelectedImage,
}) => {
  const uploadFile = async (e) => {
    setSelectedImage(e.target.files[0]);
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);
    try {
      const res = await uploadImage(formData);
      setImageId(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div>
      {selectedImage ? (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={
              !!selectedImage && typeof selectedImage === 'string' && selectedImage.includes("localhost")
                ? selectedImage
                : URL.createObjectURL(selectedImage)
            }
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      ) : (
        <>
          <br />

          <br />
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              uploadFile(event);
            }}
          />
        </>
      )}
    </div>
  );
};

export default UploadAndDisplayImage;
