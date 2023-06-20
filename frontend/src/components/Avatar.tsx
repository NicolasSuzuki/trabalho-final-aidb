import {
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { cameraStyles as styles, petStyles } from "../utils/styles";
import { uri } from "../constants/imageUri";

interface AvatarProps {
  pet: { data: string; id: number };
  avatar: string;
  setAvatar: (value: any) => void;
  blockOpenCamera?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  pet,
  blockOpenCamera = false,
  avatar,
  setAvatar,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then((r) =>
      setHasPermission(r.status === "granted")
    );
  }, []);
  useEffect(() => {
    if (capturedImage) {
      const imgUrl = capturedImage.uri;
      setAvatar(imgUrl);
    }
  }, [capturedImage]);

  const __takePicture = async () => {
    if (!camera) return;
    setLoading(true);
    camera.takePictureAsync().then((photo) => {
      setCapturedImage(photo);
      setOpenCamera(false);
      setLoading(false);
    });
  };

  if (openCamera)
    return (
      <CameraCMP
        takePicture={__takePicture}
        setCamera={setCamera}
        setOpenCamera={setOpenCamera}
        loading={loading}
      />
    );
  return (
    <TouchableOpacity
      key={pet.id}
      style={petStyles.avatar}
      onPress={() =>
        !blockOpenCamera && hasPermission ? setOpenCamera(true) : null
      }
    >
      <ImageBackground
        source={
          avatar
            ? {
                uri: capturedImage ? avatar : `${uri}${avatar}`,
              }
            : require("../img/defaultAvatar.jpg")
        }
        style={petStyles.avatar}
      />
    </TouchableOpacity>
  );
};

interface CameraProps {
  setCamera: (r: any) => void;
  setOpenCamera: (r: any) => void;
  takePicture: () => void;
  loading: Boolean;
}
const CameraCMP = ({ setOpenCamera, setCamera, takePicture, loading }: CameraProps) => {
  const [type, setType] = useState<"front" | "back" | number>(
    Camera.Constants.Type.back
  );
  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(r) => {
          setCamera(r);
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setOpenCamera(false);
          }}
        >

            {/*@ts-ignore*/}
            <MaterialIcons
              style={{ marginBottom: 10 }}
              name="close"
              size={24}
              color="white"
            />
        </TouchableOpacity>
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === "back" ? "front" : "back");
            }}
          >
            {/*@ts-ignore*/}
            <MaterialIcons
              style={{ marginBottom: 10 }}
              name="flip-camera-android"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePicture}
            style={!loading ? styles.pictureButton : styles.loading}
          />
          <TouchableOpacity style={{ width: 20 }} />
        </SafeAreaView>
      </Camera>
    </View>
  );
};
export default Avatar;
