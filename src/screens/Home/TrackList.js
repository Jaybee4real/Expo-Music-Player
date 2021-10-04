import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { AudioContext } from '../../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { Audio } from 'expo-av';
import { selectAudio } from '../../misc/audioController';
import { storeAudioForNextOpening } from '../../utils/helpers';
import SongItem from '../../components/SongItem';
import Background from '../../components/Background';
import { Modalize } from 'react-native-modalize';
import { useFocusEffect } from '@react-navigation/core';



export default function TrackList({...props }) {
  const context = useContext(AudioContext);
  const [optionModalVisible, setOptionModalVisible] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const handleAudioPress = async audio => {
    await selectAudio(audio, context);
  };

  const layoutProvider = new LayoutProvider(
    i => 'audio',
    (type, dim) => {
      switch (type) {
        case 'audio':
          dim.width = Dimensions.get('window').width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );


  useEffect(() => {
    context.loadPreviousAudio();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      props.route.params.setActivePage("Tracks")
    }, [])
  );

  const rowRenderer = (type, item, index, extendedState) => {
    return (
      <SongItem
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeListItem={context.currentAudioIndex === index}
        duration={item.duration}
        onFavourite={() => console.log("Is Favourited")}
        onAudioPress={() => handleAudioPress(item)}
        onOptionPress={() => {
          setCurrentItem(item)
          setOptionModalVisible(true);
        }}
      />
    );
  };


  return (
    <AudioContext.Consumer>
      {({ dataProvider, isPlaying }) => {
        if (!dataProvider._data.length) return null;
        return (
          <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10 }}>
            <Background />
            <RecyclerListView
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={rowRenderer}
              extendedState={{ isPlaying }}
            />
          </View>
        );
      }}
    </AudioContext.Consumer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

