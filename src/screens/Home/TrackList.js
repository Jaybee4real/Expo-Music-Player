import React, { Component } from 'react';
import {  View, StyleSheet, Dimensions } from 'react-native';
import { AudioContext } from '../../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { Audio } from 'expo-av';
import {
  play,
  pause,
  resume,
  playNext,
  selectAudio,
} from '../../misc/audioController';
import { storeAudioForNextOpening } from '../../utils/helpers';
import SongItem from '../../components/SongItem';
import Background from '../../components/Background';


export class TrackList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };
    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
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


  handleAudioPress = async audio => {
    await selectAudio(audio, this.context);
  };

  componentDidMount() {
    this.context.loadPreviousAudio();
  }

  rowRenderer = (type, item, index, extendedState) => {
    return (
      <SongItem
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.duration}
        onFavourite={() => console.log("Is Favourited")}
        onAudioPress={() => this.handleAudioPress(item)}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
      />
    );
  };


  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider, isPlaying }) => {
          if (!dataProvider._data.length) return null;
          return (
          <View style={{ flex: 1,  paddingHorizontal: 15, paddingTop: 10 }}>
			      <Background />
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{ isPlaying }}
              />
            </View>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrackList;
