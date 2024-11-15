import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import domtoimage from 'dom-to-image';


import Button from './components/Buttons';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import Second from './components/SecondPage';



const PlaceholderImage = require('./assets/images/biggie.jpg');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const rem = windowWidth / 320;

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
        domtoimage
          .toJpeg(imageRef.current, {
            quality: 0.95,
            width: 320,
            height: 440,
          })
          .then(dataUrl => {
            let link = document.createElement('a');
            link.download = 'sticker-smash.jpeg';
            link.href = dataUrl;
            link.click();
          })
          .catch(e => {
            console.log(e);
          });
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            ref={imageRef}
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button
            label="Use this photo" onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <TouchableOpacity style={styles.buttoncontainer}>
      <View style={styles.rect3}></View>
      <TouchableOpacity style={styles.button2}></TouchableOpacity>
      <View style={styles.rect5}></View>
      <link href='./components/SecondPage'></link>
      <Text style={styles.goHome}>Go Second</Text>
    </TouchableOpacity>

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58 * rem,
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80 * rem,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttoncontainer: {
    backgroundColor: "rgba(240,12,12,0.99)",
    borderWidth: 0.3 * rem,
    borderColor: "rgba(212,44,44,1)",
    borderStyle: "solid",
    width: 135 * rem,
    height: 52 * rem,
  },
  rect3: {
    flex: 0.02,
    backgroundColor: "rgba(206, 206, 206,1)",
  },
  button2: {
    flex: 1.07,
    backgroundColor: "rgba(251, 251, 251,1)",
  },
  rect5: {
    flex: 0,
    backgroundColor: "rgba(214, 214, 214,1)",
  },
});

